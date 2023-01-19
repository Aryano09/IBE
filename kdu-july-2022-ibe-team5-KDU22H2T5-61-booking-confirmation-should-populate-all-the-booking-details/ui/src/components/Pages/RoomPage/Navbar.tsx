import NavForm from './NavForm'

const Navbar = ({
    guestCountState,
    roomCountState,
    bedCountState,
    selectedDatesState,
    tenantConfigurationState,
    dateCalenderRatesState,
  }: any) => {
  return (
    <div className='grid'>
        <NavForm tenantConfigurationState={tenantConfigurationState} guestCountState={guestCountState} roomCountState={roomCountState} bedCountState={bedCountState} selectedDatesState={selectedDatesState} dateCalenderRatesState={dateCalenderRatesState}/>
    </div>
  )
}

export default Navbar