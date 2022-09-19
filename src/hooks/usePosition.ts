export const usePosition = () => {
  const containerTarget = ref<HTMLElement | null>(null)
  const { y: containerTargetScrollY } = useScroll(containerTarget)

  onActivated(() => {
    if (!containerTarget.value)
      return

    // @ts-expect-error let me do it
    containerTarget.value.$el.scrollTop = containerTargetScrollY.value
  })

  return containerTarget
}
