import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProps {
  open: boolean;
  onRoomModalOpenState: (value: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddRoomModal({ open, onRoomModalOpenState }: IProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [description, setDescription] = useState("");
  const [nightlyRate, setNightlyRate] = useState("");
  const [availability, setAvailability] = useState(true);

  const [errors, setErrors] = useState({
    roomNumber: false,
    roomType: false,
    nightlyRate: false,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  console.log({ open });

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    onRoomModalOpenState?.(false);
    setRoomNumber("");
    setRoomType("");
    setDescription("");
    setNightlyRate("");
    setAvailability(true);
    setErrors({
      roomNumber: false,
      roomType: false,
      nightlyRate: false,
    });
  };

  const handleAddRoom = (event) => {
    event.preventDefault();

    // Hata kontrolü
    let newErrors = {
      roomNumber: roomNumber === "",
      roomType: roomType === "",
      nightlyRate: nightlyRate === "",
    };

    setErrors(newErrors);

    const isValid = !Object.values(newErrors).includes(true);

    if (isValid) {
      const formData = {
        roomNumber,
        roomType,
        description,
        nightlyRate,
        availability,
      };
      console.log("Form submitted successfully", formData);
      // Burada formu işleme veya API'ye gönderme kodunu ekleyebilirsin
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullScreen={fullScreen}
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Oda Ekle
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Oda Numarası"
              variant="outlined"
              fullWidth
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              error={errors.roomNumber} // Hata durumu
              helperText={errors.roomNumber && "Oda numarası boş bırakılamaz"} // Hata mesajı
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <FormControl fullWidth error={errors.roomType}>
              <InputLabel id="room-type-label">Oda Tipi</InputLabel>
              <Select
                labelId="room-type-label"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                label="Oda Tipi"
              >
                <MenuItem value="Single">Standart</MenuItem>
                <MenuItem value="Double">Deluxe</MenuItem>
              </Select>
              {errors.roomType && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Oda tipi boş bırakılamaz
                </p>
              )}
            </FormControl>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Açıklama"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <TextField
              label="Gecelik Ücret"
              variant="outlined"
              fullWidth
              type="number"
              value={nightlyRate}
              onChange={(e) => setNightlyRate(e.target.value)}
              error={errors.nightlyRate} // Hata durumu
              helperText={errors.nightlyRate && "Gecelik ücret boş bırakılamaz"} // Hata mesajı
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                />
              }
              label="Müsait"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddRoom}>
            Ekle
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}