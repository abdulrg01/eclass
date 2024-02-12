import { Box, Modal } from "@mui/material";

export default function CustomModel({
  open,
  setOpen,
  setRoute,
  Component,
}) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledBy="modal-modal-title"
      aria-description="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
}
