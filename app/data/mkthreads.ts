interface MkThreadsRequest {
    title: string;
}

interface MkThreadsResponse {
    // Define the expected response properties here
    // For example:
    // id: string;
    // title: string;
    // createdAt: string;
    [key: string]: any;
}

export const response = async (title: string): Promise<MkThreadsResponse> => {
    try {
        const response = await fetch('/api/mkthreads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title } as MkThreadsRequest),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<MkThreadsResponse>;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
}