import { useEffect, useState } from "react"
import { getTickets, TicketType, type TicketListType } from "../../api/tickets"
import TicketHeader from "../Dashboard/TicketHeader"
import TicketBar from "../Dashboard/TicketBar"
import EmptyState from "../../components/EmptyState"
import Loader from "../../components/Loader"
import Search from "./Search"
import useApi from "../../hooks/useApi"

const Tickets = () => {
  const [ page, setPage ] = useState<number>(0)
  const [ tickets, setTickets ] = useState<TicketType[]>([])
  const { data, loading, refresh } = useApi<TicketListType>(() => getTickets(15, page))

  useEffect(() => {
    if (data) setTickets([ ...tickets, ...data.tickets ])
    setPage(prev => prev + 1)
  }, [data])

  const loadMore = () => {
    if (data && page <= data.totalPages) refresh()
  }

  return (
    <div className="ticketlist wrapper">
      <div className="searchbar">
        <h1>Tickets</h1>
        <Search />
      </div>
      { !tickets && loading 
        ? <Loader />
        : <section className="tickets container">
            <h2>All Tickets</h2>
            { tickets.length
            ? <>
                <div className="scrollable">
                  <TicketHeader />
                  { tickets.map(ticket => <TicketBar key={ticket._id} ticket={ticket} /> )}
                </div>
                <div className="load-more">
                { loading
                  ? <Loader />
                  : <>
                      <p>You have viewed {tickets.length} of {data?.totalCount} tickets.</p>
                      <progress value={tickets.length} max={data?.totalCount}></progress>
                      <button className="link" onClick={loadMore} disabled={!!data && page > data.totalPages}>Load More</button> 
                    </>
                }
                </div>
              </>
            : <EmptyState loading={loading}>
                <h3>No tickets found</h3>
                <p>Create your first ticket and it will show up here.</p>
              </EmptyState>
            }
          </section>
      }
    </div>
  )
}

export default Tickets