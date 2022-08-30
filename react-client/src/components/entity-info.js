/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import Typography from 'components/typography'

function EntityInfo({data}) {
  return (
    <Wrapper
      css={{
        background: `linear-gradient(0deg, ${data.Color.code2} 20%, ${data.Color.code1} 110%)`,
      }}
    >
      <PlaylistImage src={data.picture} alt={data.name} />
      <div css={{marginLeft: 30}}>
        <Typography css={{marginLeft: 5}} variant="label">
          PLAYLIST
        </Typography>
        <Typography variant="h0">{data.name}</Typography>
        <Typography css={{marginTop: 30, marginLeft: 5}} variant="label">
          {data.User.name} - {data.Songs.length} songs
        </Typography>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  padding: '80px 30px 30px 30px',
  userSelect: 'none',
})

const PlaylistImage = styled.img({
  width: 220,
  height: 220,
  boxShadow: `0px 0px 10px rgba(0,0,0,1)`,
})

export default EntityInfo
