import React from 'react'
import {
    Button,
    Container,
    CssBaseline,
    Typography,
    Alert,
    Backdrop,
} from '@material-ui/core'
import Header from './Header'
import MusicTempo from 'music-tempo'
import { LoadingButton } from '@material-ui/lab'
import { Check } from '@material-ui/icons'

const context = new AudioContext()

const App = () => {
    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [bpm, setBpm] = React.useState(null)
    const [drag, setDrag] = React.useState(false)
    const [alert, setAlert] = React.useState('')

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            onDragOver={(e) => {
                e.preventDefault()
                setDrag(true)
            }}
            onDragLeave={() => {
                setDrag(false)
            }}
            onDrop={(e) => {
                e.preventDefault()
                setBpm(null)
                setDrag(false)
                const file = e.dataTransfer.files[0]
                if (!file.type.startsWith('audio/')) {
                    return setAlert('오디오 파일만 사용 가능합니다.')
                }
                setAlert(null)
                setFile(file)
            }}
        >
            <CssBaseline />
            <Header />
            <Backdrop style={{ zIndex: 99999 }} open={drag}>
                <Typography color="#fff" fontSize={30} fontWeight={900}>
                    드래그해서 파일 선택하기
                </Typography>
            </Backdrop>
            <Container style={{ marginTop: 30 }}>
                <Typography variant="h4">BPM 측정하기</Typography>

                {(bpm || alert) && (
                    <Alert
                        severity={alert ? 'error' : 'success'}
                        style={{ marginBottom: 10, marginTop: 5 }}
                    >
                        {alert ? alert : <>BPM: {bpm}</>}
                    </Alert>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        type="file"
                        accept="audio/*"
                        style={{ display: 'none' }}
                        id="file-select"
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setFile(e.target.files[0])
                                setBpm(null)
                            }
                        }}
                    />
                    <label htmlFor="file-select">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                        >
                            파일 선택
                        </Button>
                    </label>
                    <Typography variant="h6" component="span">
                        {file ? file.name : '파일을 선택해주세요'}
                    </Typography>
                </div>
                <LoadingButton
                    loading={loading}
                    variant="outlined"
                    color="primary"
                    startIcon={<Check />}
                    style={{ marginTop: 10 }}
                    disabled={!file}
                    loadingPosition="start"
                    onClick={async () => {
                        setLoading(true)
                        setBpm(null)
                        setAlert(null)
                        const reader = new FileReader()
                        reader.onload = function (fileEvent) {
                            context.decodeAudioData(
                                fileEvent.target.result,
                                (buffer) => {
                                    try {
                                        let audioData = []

                                        if (buffer.numberOfChannels === 2) {
                                            const channel1Data =
                                                buffer.getChannelData(0)
                                            const channel2Data =
                                                buffer.getChannelData(1)
                                            const length = channel1Data.length
                                            for (let i = 0; i < length; i++) {
                                                audioData[i] =
                                                    (channel1Data[i] +
                                                        channel2Data[i]) /
                                                    2
                                            }
                                        } else {
                                            audioData = buffer.getChannelData(0)
                                        }

                                        const tempo = new MusicTempo(audioData)

                                        setLoading(false)

                                        setBpm(Math.round(tempo.tempo))
                                    } catch (e) {
                                        setAlert(e.message)
                                    }
                                },
                            )
                        }
                        reader.readAsArrayBuffer(file)
                    }}
                >
                    BPM 측정하기
                </LoadingButton>
            </Container>
        </div>
    )
}

export default App
