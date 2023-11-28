import Home from '../../components/Home/Home';
import Stopwatch from '../../components/Home/Stopwatch';
import { render, screen, within } from '@testing-library/react';

describe(Home, () => {
    // ------------------------------------------------------------------------------------------
    // Feature to test: User should be able to view an End of the day summary for all their tasks
    // ------------------------------------------------------------------------------------------
    it("Renders the Stopwatch component in the document", () => {
        const component = render(<Home />);
        const childComponent = component.getByText("Stopwatch");
        expect(childComponent).toBeInTheDocument();
    });
    
})