import fs from 'fs';

import data from './data.json';
import TodoNode from './model';

const todoData = data as { [key in string]: TodoNode };

// Missing Node 찾기
const checkMissingNodes = (TodoData: { [key: string]: TodoNode }): string[] => {
  const missingNodes = new Set<string>();

  for (const key in TodoData) {
    const node = TodoData[key];

    [...node.prev, ...node.next, ...node.related].forEach(relatedKey => {
      if (!(relatedKey in TodoData)) {
        missingNodes.add(relatedKey);
      }
    });
  }

  return Array.from(missingNodes);
};

const missingNodes = checkMissingNodes(todoData);
console.log('missingNodes', missingNodes);

// 관계 깨진 노드들 수정하기

const fixMissingNodes = (TodoData: { [key: string]: TodoNode }) => {
  for (const key in TodoData) {
    const node = TodoData[key];

    for (const key2 in TodoData) {
      const node2 = TodoData[key2];
      if (node.id !== node2.id) {
        if (node2.prev.includes(node.id) && !node.next.includes(node2.id)) {
          node.next.push(node2.id);
          console.log(node.id, '.next', node2.id);
        }
        if (node2.next.includes(node.id) && !node.prev.includes(node2.id)) {
          node.prev.push(node2.id);
          console.log(node.id, '.prev', node2.id);
        }
        if (
          node2.related.includes(node.id) &&
          !node.related.includes(node2.id)
        ) {
          node.related.push(node2.id);
          console.log(node.id, '.related', node2.id);
        }
      }
    }
  }
};

fixMissingNodes(todoData);

// 수정된 데이터 data-changed.json에 저장하기

fs.writeFileSync(
  `${__dirname}/data-changed.json`,
  JSON.stringify(todoData, null, 1),
);

// 마크다운 파일 만들기

const createMarkdownFile = (node: TodoNode) => {
  const filename = `${__dirname}/graphs/${node.id}.md`;
  const content = `
next: ${node.next.map(item => `[[${item}]]`).join(', ')}
related: ${node.related.map(item => `[[${item}]]`).join(', ')}
`;

  fs.writeFileSync(filename, content);
};

Object.values(todoData).forEach(node => {
  createMarkdownFile(node);
});

// neo4j 쿼리 생성

// open file that save total query
const totalQuery = fs.openSync(`${__dirname}/neo4j-query.txt`, 'w');

const nodeToNeo4jQuery = (node: TodoNode) => {
  const typePascalCase =
    node.type.charAt(0).toUpperCase() + node.type.substring(1);
  const query = `
CREATE (n:${typePascalCase} {id: "${node.id}", title: "${node.title}"})
RETURN n;
`;
  return query;
};

const edgeToNeo4jQuery = (node: TodoNode) => {
  const queries = [];

  for (const key in node.next) {
    const target = node.next[key];
    const query = `
MATCH (a {id: "${node.id}"}), (b {id: "${target}"})
CREATE (a)-[r:next]->(b)
RETURN r;
`;

    queries.push(query);
  }

  return queries.join('\n');
};

Object.values(todoData).forEach(node => {
  const query = nodeToNeo4jQuery(node);
  fs.appendFileSync(totalQuery, query);
});

Object.values(todoData).forEach(node => {
  const query = edgeToNeo4jQuery(node);
  fs.appendFileSync(totalQuery, query);
});
