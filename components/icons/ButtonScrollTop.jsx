import * as React from 'react'

export default function SvgComponent (props) {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={963}
        height={963}
        viewBox='0 0 963 963'
        {...props}
      >
        <path d='M481.5 963C747.4 963 963 747.4 963 481.5S747.4 0 481.5 0 0 215.6 0 481.5 215.6 963 481.5 963zm61.8-691.6l233.2 213.401c19.4 17.799 29.2 42.1 29.2 66.398 0 21.701-7.8 43.5-23.601 60.701-33.599 36.7-90.499 39.2-127.199 5.6L482.6 459.8 305.3 622.4c-36.6 33.6-93.6 31.1-127.2-5.5s-31.1-93.6 5.5-127.201L421.7 271.4c34.5-31.5 87.2-31.5 121.6 0z' />
      </svg>
      <style jsx>{`
        svg {
          position: fixed;
          right: 32px;
          bottom: 32px;
          cursor: pointer;
          animation: .8s fadeIn;
        }
        svg:hover {
          opacity: .8;
          border-color: #ccc;
        }

        @keyframes fadeIn {
          from {
            filter: blur(20px);
            opacity: 0;
          }
          to {
            filter: blur(1px);
            opacity: 1;
          }
        }
    `}
      </style>
    </>
  )
}
