import { registerSheet } from 'react-native-actions-sheet';

import AlertModal from './modals/AlertModal';
import ConfirmModal from './modals/ConfirmModal';
import InputSheet from './InputSheet';
import PickerSheet from './PickerSheet';

registerSheet(PickerSheet.id, PickerSheet);
registerSheet(InputSheet.id, InputSheet);

registerSheet(ConfirmModal.id, ConfirmModal);
registerSheet(AlertModal.id, AlertModal);

export {};
