import {
  ElUpload,
  ElUploadInternalFileDetail,
  FileListItem
} from 'element-ui/types/upload'

export type FileDetail = ElUploadInternalFileDetail & {
  response?: { data?: { url?: string } }
}

export type Remove = (file: FileDetail, fileList: FileDetail[]) => void

export type Success = (
  response: any,
  file: FileDetail,
  fileList: FileDetail[]
) => void

export type Preview = (file: ElUploadInternalFileDetail) => void

declare class _Upload extends ElUpload {
  fileList: any
}

export declare class FnbUpload extends _Upload {
  /**
   * 已上传的 url 值
   */
  value: string | string[]

  /**
   * 宽度
   */
  width: number

  /**
   * 宽度
   */
  height: number

  /**
   * 宽度
   */
  preview: boolean

  /**
   * 重置 fileList 类型
   *
   * @deprecated 会根据 value 值自动填入，不推荐使用
   */
  fileList: (Partial<FileListItem> & { type?: string })[]

  /**
   * 宽度
   */
  onRemove: Remove

  /**
   * 宽度
   */
  onSuccess: Success

  /**
   * 宽度
   */
  onPreview: Preview
}
