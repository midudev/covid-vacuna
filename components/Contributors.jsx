import Image from 'next/image'

export default function Contributors ({ contributors }) {
  return (
    <>
      <ul>
        {contributors.map(({ avatar, login, url }) => (
          <li key={login}>
            <a href={url} title={`Github de ${login}`}>
              <div>
                <Image src={avatar} width={64} height={64} />
              </div>
            </a>
          </li>
        ))}
      </ul>
      <style jsx>{`
      ul {
        grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
        display: grid;
        list-style: none;
        gap: 8px;
        margin: 0;
        padding: 0;
        place-content: center;
        place-items: center;
        max-width: 800px;
        width: 100%;
      }

      a {
        color: #555;
        display: flex;
        font-weight: 500;
        flex-direction: column;
        place-items: center;
      }

      a:hover {
        box-shadow: rgb(210 239 253) 7px 7px;
      }
    `}
      </style>
    </>
  )
}
