import Lab from 'components/Lab'
import { useTranslate } from 'hooks/useTranslate'

export default function Labs ({ totals, labs }) {
  const translate = useTranslate()
  const laboratories = labs.map(labName => {
    let lab = {}
    switch (labName) {
      case 'moderna':
        lab = {
          labName: labName,
          labAlt: translate.home.alt.modernaLogo,
          dosisEntregadas: totals.dosisEntregadasModerna
        }
        break
      case 'astrazeneca':
        lab = {
          labName: labName,
          labAlt: translate.home.alt.astrazenecaLogo,
          dosisEntregadas: totals.dosisEntregadasAstrazeneca
        }
        break
      default:
        lab = {
          labAlt: translate.home.alt.pfizerLogo,
          dosisEntregadas: totals.dosisEntregadasPfizer
        }
        break
    }
    lab.labName = labName
    lab.labSrc = `/${labName}-logo.png`

    return lab
  }).sort((a, b) => b.dosisEntregadas - a.dosisEntregadas)

  return (
    <div>
      {laboratories.map(lab => <Lab key={lab.labName} lab={lab} />)}
    </div>
  )
}
