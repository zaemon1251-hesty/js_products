import Link from 'next/link';
import Counter from '../components/Sampledata';
import Layout from '../components/Layout';
import Sampledata from '../components/Sampledata';

export default () =><div>
    <Layout header="fire" title="page.firebase">
      <Sampledata />
      <hr />
      <Link href="/">
        <button>
          &lt;&lt; Back to Top
        </button>
      </Link>
    </Layout>
</div>