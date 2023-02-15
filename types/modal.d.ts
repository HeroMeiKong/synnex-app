import type { SDK } from '#/sdk'

export interface ModalData {
  id?: string;
  callback?: function;
  form?: SDK;
}