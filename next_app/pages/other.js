import Link from 'next/link';
import Counter from '../components/Counter';
import Layout from '../components/Layout';

export default () =><div>
    <Layout header="other" title="other page.">
      <Counter />
      <hr />
      <Link href="/">
        <button>
          &lt;&lt; Back to Top
        </button>
      </Link>
    </Layout>
</div>