import { useEffect } from "react"
import { loadScript } from "../utils"
import { createPortal } from "react-dom"
import {styles} from "../styles"

function ContainerCaptcha() {
  useEffect(() => {
    loadScript()
  }, [])

  return (createPortal(
    <div className="overlay" style={styles.modalOverlay} id="modalOverlay">
      <div className="modal" style={styles.modal} id="modal">
        <div id="captchaForm" />
      </div>
    </div>, document.body)
  )
}
export default ContainerCaptcha