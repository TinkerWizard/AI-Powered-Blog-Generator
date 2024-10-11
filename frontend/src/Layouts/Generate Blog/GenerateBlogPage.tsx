import { FormControl, FormHelperText, Input, InputLabel, Stack, TextField } from "@mui/material";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';

export const GenerateBlogPage: React.FC<{}> = () => {

    // Dummy datas
    const username = localStorage.getItem('username');

    const [concept, setConcept] = useState<string>('');
    const [numberOfWords, setNumberOfWords] = useState<number | undefined>();
    const [typeOfResponse, setTypeOfResponse] = useState<string>('');
    // const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const typeOfResponses = ['Passage', 'Bullet Points', 'Numbered Points'];
    const handleGenerateClick = async (event: any) => {
        event.preventDefault();
        if (!numberOfWords) {
            alert("Please provide the number of words.");
            return;
        }
        if (!concept) {
            alert("Please provide a concept.");
            return;
        }
        const response = await fetch('http://127.0.0.1:8000/api/blogs/generate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                concept,
                number_of_words: numberOfWords,  // Convert to snake_case here
                type_of_response: typeOfResponse
            })
        });
        const data = await response.json();
        if(response.ok)
        {
            // setContent(data.content);
            setTitle(data.title);
            setBody(data.body);
        }
    }
    const handleUploadBlogClick = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/blogs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author_name: null,
                author_username: username,
                title: title,
                body: body,
                created_date: null,
                blog_cover: null,
                author_id: null
            }),
        });
        const data = await response.json();
        if(response.ok)
        {
            alert(data.message);
        }
        else {
            console.error('Error:', data); // Log any errors for debugging
        }
    }
    return (
        <div className="p-5" style={{ width: '100%' }}>
            {/* Desktop */}
            <div className="d-none d-xl-block d-xxl-block" style={{ width: '100%' }}>
                {/* Generate Blog */}
                <form action="">
                    <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Concept"
                            onChange={e => setConcept(e.target.value)}
                            value={concept}
                            fullWidth
                            required
                        />
                        <TextField
                            type="number"
                            variant='outlined'
                            color='secondary'
                            label="Number of words"
                            onChange={e => setNumberOfWords(Number(e.target.value))}
                            value={numberOfWords}
                            fullWidth
                            required
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue="Passage"
                            helperText="Please select your desired response type"
                            onChange={e => setTypeOfResponse(e.target.value)}
                        >
                            {typeOfResponses.map((response) => (
                                <MenuItem key={response} value={response}>
                                    {response}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input type="file" />
                    </Stack>
                    <button className="btn btn-primary" onClick={handleGenerateClick}>Generate</button>
                </form>

                <div>
                    {title
                        &&
                    <div>
                        <h1>{title}</h1>
                        <p>{body}</p>
                        <button className="btn btn-primary" onClick={handleUploadBlogClick}>Upload blog</button>
                    </div>
                    }
                </div>
            </div>

            {/* Mobile */}
            <div className="d-block d-sm-none">
                <form action="">
                    <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Concept"
                            onChange={e => setConcept(e.target.value)}
                            value={concept}
                            fullWidth
                            required
                        />
                        <TextField
                            type="number"
                            variant='outlined'
                            color='secondary'
                            label="Number of words"
                            onChange={e => setNumberOfWords(Number(e.target.value))}
                            value={numberOfWords}
                            fullWidth
                            required
                        />
                    </Stack>
                </form>
            </div>
        </div>
    );
}
