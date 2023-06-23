import { registerSheet } from 'react-native-actions-sheet';

import AlertModal from './modals/AlertModal';
import ConfirmModal from './modals/ConfirmModal';
import PickerSheet from './PickerSheet';

registerSheet(PickerSheet.id, PickerSheet);
registerSheet(ConfirmModal.id, ConfirmModal);
registerSheet(AlertModal.id, AlertModal);

export {};
