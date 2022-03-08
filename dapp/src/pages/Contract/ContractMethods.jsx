import {
  Button, Card, Form, Input,
} from 'antd';
import Text from 'antd/lib/typography/Text';

const ContractMethods = ({ displayedContractFunctions, responses }) => displayedContractFunctions.map((item, key) => (
  <Card title={ `${key + 1}. ${item?.name}` } size="small" style={ { marginBottom: '20px' } }>
    <Form layout="vertical" name={ `${item.name}` }>
      { item.inputs.map((input, k) => (
        <Form.Item
          label={ `${input.name} (${input.type})` }
          name={ `${input.name}` }
          required
          style={ { marginBottom: '15px' } }
          key={ `${key + 1}_${item?.name}_${input?.name}_${input?.type}_${key * k}` } // WIP
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
      )) }
      <Form.Item style={ { marginBottom: '5px' } }>
        <Text style={ { display: 'block' } }>
          { responses[item.name]?.result && `Response: ${JSON.stringify(responses[item.name]?.result)}` }
        </Text>
        <Button type="primary" htmlType="submit" loading={ responses[item?.name]?.isLoading }>
          { item.stateMutability === 'view' ? 'Read🔎' : 'Transact💸' }
        </Button>
      </Form.Item>
    </Form>
  </Card>
));

export default ContractMethods;
