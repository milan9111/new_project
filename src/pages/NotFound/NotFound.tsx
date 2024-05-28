import { Button, Result } from 'antd';

interface NotFoundProps {
  goHomeHandler: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ goHomeHandler }) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button onClick={goHomeHandler} type="primary">Back Home</Button>}
  />
);

export default NotFound;
