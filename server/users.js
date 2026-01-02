export const users = [
    {
        id: 1,
        user: "lucas"
    },
    {
        id: 2,
        user: "felipe"
    },
    {
        id: 3,
        user: "mirta"
    }
]

export const buscarPorNombre = (nombre) => {
    const result = users.find(c => c.user === nombre)
    if (result) {
        return result
    } else {
        return undefined
    }
}