import PageContainer from 'components/Page/Container';
import PageTitle from 'components/Page/Title';
import MintCanvas from 'components/Canvas/MintCanvas';
import PageDescription from 'components/Page/Description';
// import './style.scss';

const Homepage = () => (
  <>
    <PageContainer>
      <div className="row">
        <PageTitle>{ process.env.REACT_APP_SITE_NAME }</PageTitle>
        <PageDescription>{ process.env.REACT_APP_SITE_DESCRIPTION }</PageDescription>
      </div>
    </PageContainer>

    <section className="section--landing">
      <PageContainer>
        <div className="row">
          <div className="col">
            <MintCanvas />
          </div>
        </div>
      </PageContainer>
    </section>
  </>
);

export default Homepage;
