"use client"

import { SearchResult } from "@/types/SearchResult"
import { useState } from "react"
import { SearchForm } from "./SearchForm"
import { SearchRaveal } from "./SearchRaveal"

import * as api from '@/api/site'

type Props = {
    id: number
}
export const Search = ({ id }: Props) => {

    const [results, setResults] = useState<SearchResult>()

    const handleSearchButton = async (cpf: string) => {
        if (!cpf) return
        const json = await api.searchCPF(id, cpf)
        if (!json) return alert('CPF não encontrado')
        setResults(json)
    }

    return (
        <section className=" bg-gray-900 p-5 rounded">
            {!results && <SearchForm onSearchButton={handleSearchButton} />}
            {results && <SearchRaveal results={results} />}
        </section>
    )
}