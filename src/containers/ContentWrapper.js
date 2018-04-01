import { Container } from 'unstated';

export default class ContentManagement extends Container {
  state = {
    expanded: false,
  };

  toggleContent = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
}
