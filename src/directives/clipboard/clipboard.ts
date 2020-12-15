// Inspired by https://github.com/Inndy/vue-clipboard2
import Clipboard from 'clipboard'
import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'

if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value
        },
        action() {
          return binding.arg === 'copy' ? 'cut' : 'copy'
        }
      })
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success
        callback?.(e)
      })
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error
        callback?.(e)
      })
      el._v_clipboard = clipboard as any
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard!.text = () => binding.value

      el._v_clipboard!.action = () => (binding.arg === 'copy' ? 'cut' : 'copy')
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard!.destroy()
      delete el._v_clipboard
    }
  }
} as DirectiveOptions

type EL = HTMLElement & {
  _v_clipboard?: Clipboard & Clipboard.Options
  _v_clipboard_error?: (e: Clipboard.Event) => void
  _v_clipboard_success?: (e: Clipboard.Event) => void
}

interface DirectiveOptions {
  [x: string]: any
  bind?: DirectiveFunction
  inserted?: DirectiveFunction
  update?: DirectiveFunction
  componentUpdated?: DirectiveFunction
  unbind?: DirectiveFunction
}

type DirectiveFunction = (
  el: EL,
  binding: DirectiveBinding,
  vnode: VNode,
  oldVnode: VNode
) => void
