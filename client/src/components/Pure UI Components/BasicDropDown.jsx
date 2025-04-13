import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { toasterContextFunction } from '../../Contexts/toasterContext';

const API_URL = import.meta.env.VITE_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicDropDown() {
  const [option, setOption] = React.useState('');
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [conversionProgress, setConversionProgress] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [transcriptProgress, setTranscriptProgress] = React.useState(0);
  const { Toaster, toast } = React.useContext(toasterContextFunction());



  const handleOpen = () => setModalOpen(true);

  const handleClose = React.useCallback(() => {
    setModalOpen(false);
    setUploadProgress(0);
    setConversionProgress(0);
    setTranscriptProgress(0);
    setIsProcessing(false);
    setSelectedFile(null);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    if (event.target.value === 'Transcribe') {
      setOption('');
      setModalOpen(true);
    }
  };

  // WebSocket connection for conversion progress
  React.useEffect(() => {
    if (isModalOpen && isProcessing) {
      const ws = new WebSocket('ws://localhost:8080');
      ws.onmessage = (event) => {
        const { stage, percent } = JSON.parse(event.data);
        if (stage === 'conversion') setConversionProgress(percent);
        if (stage === 'Transcribing') setTranscriptProgress(percent);
      };
      ws.onerror = (error) => console.error('WebSocket error:', error);
      ws.onclose = () => console.log('WebSocket closed');
      return () => ws.close();
    }
  }, [isModalOpen, isProcessing]);

  React.useEffect(() => {
    if (transcriptProgress === 100 || transcriptProgress == -1) {
      handleClose(); // Close the modal
    }
  }, [transcriptProgress]);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const transcriptionPromise = new Promise((resolve, reject) => {

      })
      const response = axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      toast.promise(response, {
        loading: 'Loading...',
        success: (result) => {
          if (result.data.status) {
            console.log(result.data.data);
            return `Transcription completed!`;
          }
          console.log(result)
          setTranscriptProgress(-1)
          return `Transcription - Error`
        },
        error: 'Transcription - Error',
      })
      console.log(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsProcessing(false);
    }
  };


  // Determine progress value and label
  const progressValue = uploadProgress < 100 ? uploadProgress : conversionProgress < 100 ? conversionProgress : " Completed - " + transcriptProgress;
  const progressLabel = uploadProgress < 100
    ? 'Uploading'
    : conversionProgress < 100
      ? 'Converting'
      : 'Transcription';

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Transcribe your audio / video:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
            <Button
              onClick={handleFileUpload}
              variant="text"
              sx={{ ml: 2 }}
              disabled={!selectedFile || isProcessing}
            >
              Convert
            </Button>
            {/* Progress Display - Only shown when processing */}
            {isProcessing && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="body2" >
                  {progressLabel}: {progressValue}%
                </Typography>
                {conversionProgress < 100 && (
                  <LinearProgress
                    variant="determinate"
                    value={progressValue}
                  />
                )}
                {conversionProgress == 100 && (
                  <LinearProgress
                    value={progressValue}
                  />
                )}
              </Box>
            )}
          </Typography>
        </Box>
      </Modal>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Actions</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={option}
          label="Actions"
          onChange={handleChange}
        >
          <MenuItem value="Transcribe">Transcribe</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}