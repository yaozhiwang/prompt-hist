export class PromptHistory {
  #prompts: string[] = []
  #currentIndex: number = 0

  append(prompt: string): void {
    this.#prompts.push(prompt)
    this.#currentIndex = this.#prompts.length
  }

  update(newPrompt: string): void {
    if (this.#currentIndex >= 0 && this.#currentIndex < this.#prompts.length) {
      this.#prompts[this.#currentIndex] = newPrompt
    }
  }

  next(): string | null {
    if (this.#currentIndex < this.#prompts.length) {
      ++this.#currentIndex
      if (this.#currentIndex < this.#prompts.length) {
        return this.#prompts[this.#currentIndex]
      } else {
        return ''
      }
    }
    return null
  }

  prev(): string | null {
    if (this.#currentIndex > 0) {
      return this.#prompts[--this.#currentIndex]
    }
    return null
  }
}
