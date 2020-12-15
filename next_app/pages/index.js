import Link from 'next/link';
import Counter from '../components/Counter';
import Layout from '../components/Layout';

export default () =><div>
    <Layout header="Next" title="top page">
      <Counter />
      <hr />
      <Link href="./other">
        <button>
          go to Other &gt;&gt;
        </button>
      </Link>
      <Link href="./fire">
        <button>
          show data &gt;&gt;
        </button>
      </Link>
    </Layout>
</div>