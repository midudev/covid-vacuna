export default function ButtonScrollTop ({ show, ...restOfProps }) {
  return (
    <>
      <svg
        className={show ? 'show' : ''}
        height={963}
        viewBox='0 0 963 963'
        width={963}
        {...restOfProps}
      >
        <path d='M481.5 963C747.4 963 963 747.4 963 481.5S747.4 0 481.5 0 0 215.6 0 481.5 215.6 963 481.5 963zm61.8-691.6l233.2 213.401c19.4 17.799 29.2 42.1 29.2 66.398 0 21.701-7.8 43.5-23.601 60.701-33.599 36.7-90.499 39.2-127.199 5.6L482.6 459.8 305.3 622.4c-36.6 33.6-93.6 31.1-127.2-5.5s-31.1-93.6 5.5-127.201L421.7 271.4c34.5-31.5 87.2-31.5 121.6 0z' />
      </svg>
      <style jsx>{`
        svg {
          bottom: 32px;
          cursor: pointer;
          filter: blur(10px);
          opacity: 0;
          position: fixed;
          right: 32px;
          transition: all 0.6s ease;
          visibility: hidden;
        }

        svg.show {
          filter: blur(0);
          opacity: 1;
          visibility: visible;
        }

        svg:hover {
          border-color: #ccc;
          opacity: .8;
        }
    `}
      </style>
    </>
  )
}
