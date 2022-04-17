import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const EmptyState = () => {
  return (
    <EmptyStateContainer>
      <img
        alt="Empty State Illustration empty state design illustration"
        data-id="6768821"
        data-optimize-for-bots="true"
        width={800}
        height={600}
        srcSet="https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=300x225 300w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=400x300 400w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=600x450 600w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=800x600 800w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=1000x750 1000w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=1200x900 1200w, https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=1600x1200 1600w"
        src="https://cdn.dribbble.com/users/150039/screenshots/15043316/media/d66c51a81f504f0b605cdc0fb37a0da5.png?compress=1&amp;resize=400x300"
      />
      <Typography variant="h6" style={subtitleStyles} align="center" color="primary">
        Get started by adding a <strong>Phase</strong> from the menu drawer!
      </Typography>
    </EmptyStateContainer>
  )
}

export default EmptyState

const EmptyStateContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  background: '#f1f2f5',
  alignItems: 'center',
  overflow: 'hidden',
})

const subtitleStyles: React.CSSProperties = {
  alignSelf: 'center',
  marginInline: 15,
}
