import { render, screen, within } from '@testing-library/react';
import SummaryMain from '../../components/Summary/SummaryMain';

beforeEach(() => {
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }));
});

afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
});

describe("SummaryMain", () => {
    // ------------------------------------------------------------------------------------------
    // Feature to test: User should be able to view an End of the day summary for all their tasks
    // ------------------------------------------------------------------------------------------
    it("Should load the component correctly", async () => {
        render(<SummaryMain />);
        const title = await screen.findByTestId("summary_list_dates");
        expect(title).toBeInTheDocument();
    });
});
