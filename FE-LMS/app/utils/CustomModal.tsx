import React, { FC } from "react";
import { Modal, Box } from "@mui/material";
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute: (route: string) => void;
};

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Componet }) => {
    return (
        <Modal
            open={open}
            onClose={() => setRoute("")}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                id="modal-background"
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
            >
                <Componet setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    );
};

export default CustomModal;
