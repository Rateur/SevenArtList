import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Home from '../app/page'

// Mock des composants Next.js si nécessaire
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, ...props }: { src: string; alt: string }) => <img src={src} alt={alt} {...props} />,
}))

test('Home page renders correctly', () => {
  render(<Home />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toBeDefined()
  expect(heading.textContent).toContain('Votre bibliothèque personnelle')
})
