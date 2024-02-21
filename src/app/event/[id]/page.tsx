import * as api from '@/api/site'
import { Search } from '@/components/site/Search'

import { redirect } from 'next/navigation'
type Props = {
    params: {
        id: string
    }
}

const Page = async ({ params }: Props) => {

    const eventItem = await api.getEvent(parseInt(params.id))
    if (!eventItem || !eventItem.status) return redirect('/')

    return (
        <main className=" text-center mx-auto max-w-lg p-5">
            <header>
                <h2 className=" text-1xl text-yellow-500">Amigo Secreto</h2>
                <h1 className=" text-2xl mt-5 mb-2">{eventItem.title}</h1>
                <p className=" text-sm mb-5">{eventItem.description}</p>
            </header>
            <Search id={eventItem.id} />
            <footer className=" italic text-justify mt-2 text-sm">
                HFerraz
                <a href="https://www.digitalocean.com/?refcode=d6ffb502f75f&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a></footer>
        </main>
    )
}
export default Page