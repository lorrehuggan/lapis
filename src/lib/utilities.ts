import showdown from 'showdown'

const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: number = 0

  const debounced = (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

const markdownToHtml = (markdown: string) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}

export { debounce, markdownToHtml }
