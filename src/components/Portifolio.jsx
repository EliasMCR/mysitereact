import img from '../assets/site2.png'

export const Portifolio = () => {
  return (
    <section id='portifolio' className='text-white text-center p-4'>
        <p className='text-5xl mb-10'>MEU <span className='text-[var(--primary-color)]'>PORTIFÓLIO</span></p>
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div>
              <p className='text-2xl mb-5 text-[var(--primary-color)]'>Sistema imobiliario</p>
              <img src={img} className='rounded-3xl cursor-pointer border-2 border-transparent hover:border-[var(--secondary-color)]' alt="imagem portifolio" /></div>
            <div></div>
            <div></div>
        </div>
    </section>
  )
}
