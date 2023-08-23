import { launchpadsConfig } from 'config/constants'
import { CHAIN_ID } from 'config/constants/networks'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
// eslint-disable-next-line camelcase
import { SWRConfig, unstable_serialize } from 'swr'
import LaunchpadPageRouter from 'views/Launchpads/LaunchpadPageRouter'


const LaunchpadPage = ({ fallback = {} }: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <SWRConfig
      value={{
        fallback,
      }}
    >
      <LaunchpadPageRouter />
    </SWRConfig>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { launchpadAddress } = params

  if (typeof launchpadAddress !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const launchpadData = launchpadsConfig.find((launchpad) => (launchpad.address[CHAIN_ID] === launchpadAddress))
    if (launchpadData) {
      return {
        props: {
          fallback: {
            [unstable_serialize(['launchpads', launchpadAddress.toLocaleLowerCase()])]: { address: launchpadAddress },
          },
        },
        revalidate: 60 * 60 * 6, // 6 hours
      }
    }

    return {
      notFound: true,
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    }
  }

}

export default LaunchpadPage

