"use client"

import * as api from '@/api/admin'
import { useEffect, useState } from 'react'
import { Event } from '@/types/Event'
import { EventItem, EventItemNotFound, EventItemPlaceholder } from './events/EventItem'
import { ItemButton } from './ItemButton'
import { FaPlus } from 'react-icons/fa'
import { ModalScreens } from '@/types/ModalScreens'
import { Modal } from './Modal'
import { EventAdd } from './events/EventAdd'

export const AdminPage = () => {

    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null)

    const loadEvents = async () => {
        setModalScreen(null)
        setLoading(true)
        const eventList = await api.getEvents()
        setLoading(false)
        setEvents(eventList)
    }

    useEffect(() => {
        loadEvents()
    }, [])

    return (
        <div>
            <div className=' p-3 flex items-center'>
                <h1 className=' text-2xl flex-1'>Eventos</h1>
                <ItemButton
                    IconElement={FaPlus}
                    onClick={() => setModalScreen('add')}
                />
            </div>
            <div className=' my-3'>
                {!loading && events.length > 0 && events.map(item => (
                    <EventItem
                        key={item.id}
                        item={item}
                        refreshAction={loadEvents}
                        openModal={() => { }}
                    />
                ))}
                {!loading && events.length === 0 && <EventItemNotFound />}
                {loading &&
                    <>
                        <EventItemPlaceholder />
                        <EventItemPlaceholder />
                    </>
                }

            </div>
            {modalScreen &&
                <Modal onClose={() => setModalScreen(null)}>
                    {modalScreen === 'add' && <EventAdd refreshAction={loadEvents} />}
                </Modal>
            }
        </div>
    )
}