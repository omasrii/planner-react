import { useState } from 'react'

type DialogModel = {
  dialogProps: {
    open: boolean
  }
  onConfirm: () => any
  show: () => any
  hide: () => any
}

type DialogConfig = {
  onSubmit: () => any
  onClose?: () => any
}

export const useDialog = ({ onSubmit, onClose = () => {} }: DialogConfig): DialogModel => {
  const [showDialog, setShowDialog] = useState(false)

  return {
    dialogProps: {
      open: showDialog,
    },
    onConfirm: () => {
      onSubmit()
      setShowDialog(false)
      onClose()
    },
    show: () => setShowDialog(true),
    hide: () => setShowDialog(false),
  }
}
