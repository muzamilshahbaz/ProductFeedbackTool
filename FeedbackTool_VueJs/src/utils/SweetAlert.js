// src/utils/sweetAlert.js

import Swal from 'sweetalert2';

export function showInfoAlert(title, text, confirmButtonText = 'OK') {
  return showAlert({ title, text, type: 'info', confirmButtonText });
}

export function showSuccessAlert(title, text, confirmButtonText = 'OK') {
  return showAlert({ title, text, type: 'success', confirmButtonText });
}

export function showWarningAlert(title, text, confirmButtonText = 'OK') {
  return showAlert({ title, text, type: 'warning', confirmButtonText, showCancelButton: true, cancelButtonColor: '#d33' });
}

function showAlert({
  title,
  text,
  type = 'info',
  confirmButtonText = 'OK',
  showCancelButton = false,
  confirmButtonColor = '#3085d6',
  cancelButtonColor = '#d33',
}) {
  return Swal.fire({
    title,
    text,
    icon: type,
    confirmButtonText,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
  });
}
