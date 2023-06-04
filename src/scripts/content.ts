import { PromptHistory } from './prompt-history'

const history = new PromptHistory()

window.addEventListener('load', () => {
  const textArea = setupListener()

  const { chatPanelContainer, pageContainer } = findContainer(textArea)

  if (chatPanelContainer !== null) {
    const observer = new MutationObserver(() => {
      setupListener()
    })
    observer.observe(chatPanelContainer, { childList: true })
  }

  if (pageContainer != null) {
    const observer = new MutationObserver(() => {
      // for New Chat
      const textArea = setupListener()
      const { chatPanelContainer } = findContainer(textArea)
      if (chatPanelContainer !== null) {
        const observer = new MutationObserver(() => {
          setupListener()
        })
        observer.observe(chatPanelContainer, { childList: true })
      }
    })
    observer.observe(pageContainer, { childList: true })
  }
})

function findContainer(textArea: HTMLTextAreaElement) {
  let elem = textArea.parentElement
  while (elem !== null) {
    if (elem.parentElement?.parentElement?.id === '__next') {
      break
    }
    elem = elem.parentElement
  }

  return { chatPanelContainer: elem, pageContainer: elem?.parentElement?.parentElement }
}

function setupListener(): HTMLTextAreaElement {
  const textArea = document.querySelector('#prompt-textarea') as HTMLTextAreaElement
  const sendButton = textArea.nextElementSibling as HTMLButtonElement

  textArea.placeholder += ' (↑ ↓ for history)'

  textArea.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.isComposing) {
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      history.update(textArea.value)
      const prompt = history.prev()
      if (prompt !== null) {
        setPrompt(textArea, prompt)
      }
    } else if (event.key === 'ArrowDown') {
      history.update(textArea.value)
      const prompt = history.next()
      if (prompt !== null) {
        setPrompt(textArea, prompt)
      }
    } else if (event.key === 'Enter' && !event.shiftKey) {
      if (textArea.value !== '') {
        history.append(textArea.value)
      }
    }
  })

  sendButton?.addEventListener('click', () => {
    if (textArea.value !== '') {
      history.append(textArea.value)
    }
  })

  return textArea
}

function setPrompt(textArea: HTMLTextAreaElement, prompt: string): void {
  textArea.value = prompt
  textArea.dispatchEvent(new Event('input', { bubbles: true }))
}
