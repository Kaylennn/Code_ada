import { useEffect, useRef, useState } from 'react'

function SpeciesSelect({ value, onChange, options, id, labelId, placeholder, includeAll = false, className = '' }) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef(null)
  const triggerRef = useRef(null)
  const selectedOptionRef = useRef(null)
  const allOptions = includeAll ? [{ key: 'all', name: 'All species' }, ...options] : options
  const selectedOption = allOptions.find((option) => option.key === value)
  const groupedOptions = options.reduce((groups, option) => {
    const group = groups.find((item) => item.category === option.category)
    if (group) group.options.push(option)
    else groups.push({ category: option.category, options: [option] })
    return groups
  }, [])

  useEffect(() => {
    if (open) selectedOptionRef.current?.focus()
  }, [open])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!selectRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const choose = (key) => {
    onChange(key)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const handleOptionKeyDown = (event) => {
    const optionButtons = [...selectRef.current.querySelectorAll('[role="option"]')]
    const currentIndex = optionButtons.indexOf(event.currentTarget)
    let nextIndex

    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % optionButtons.length
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + optionButtons.length) % optionButtons.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = optionButtons.length - 1
    else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (nextIndex !== undefined) {
      event.preventDefault()
      optionButtons[nextIndex].focus()
    }
  }

  return (
    <div
      className={`species-select ${className}`.trim()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      ref={selectRef}
    >
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${id}-value`}
        className="species-filter-trigger"
        id={id}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span className={!selectedOption ? 'species-select-placeholder' : ''} id={`${id}-value`}>
          {selectedOption?.name ?? placeholder}
        </span>
        <span aria-hidden="true" className="species-filter-chevron" />
      </button>
      {open && (
        <div aria-labelledby={labelId} className="species-filter-options" role="listbox">
          {includeAll && (
            <button
              aria-selected={value === 'all'}
              className="species-filter-option"
              onClick={() => choose('all')}
              onKeyDown={handleOptionKeyDown}
              ref={value === 'all' ? selectedOptionRef : null}
              role="option"
              type="button"
            >
              All species
            </button>
          )}
          {groupedOptions.map((group) => (
            <div aria-label={group.category} key={group.category} role="group">
              <span aria-hidden="true" className="species-filter-group-label">{group.category}</span>
              {group.options.map((option) => (
                <button
                  aria-selected={option.key === value}
                  className="species-filter-option"
                  key={option.key}
                  onClick={() => choose(option.key)}
                  onKeyDown={handleOptionKeyDown}
                  ref={option.key === value ? selectedOptionRef : null}
                  role="option"
                  type="button"
                >
                  {option.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SpeciesSelect
