export const escapeCPF = (cpf: string) => {
    return cpf.replace(/\.|-|,|_/gm, '')
}