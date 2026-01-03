export const wsHandler = (event, [mensajes, setMensajes], setNombre) => {
    const payload = JSON.parse(event.data)

    switch (payload.type) {
        case "INIT_CHAT":
            setMensajes(payload.data.mensajes)
            setNombre(payload.data.nombre)
            break
        case "RECEIVE_MESSAGE":
            setMensajes(prev => [...prev, payload.data]);
            break
    }
}