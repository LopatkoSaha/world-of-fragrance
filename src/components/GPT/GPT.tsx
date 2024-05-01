import style from './gpt.module.css';
import {useState, useEffect} from 'react';
import {gptFetchHandler} from '../../fetchs/fetchs';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const GPT = () => {
const {userName, role} = useTypedSelector(store => store.main.user);
const {langCode} = useTypedSelector(store => store.main.language);
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState([['']]);
const { transcript } = useSpeechRecognition();
const [showSpeechRec, setShowSpeechRec] = useState(false);

useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        setShowSpeechRec(false);
    }else{
        setShowSpeechRec(true);
    }
}, []);

useEffect(() => {
    setQuestion(transcript);
}, [transcript]);

const questionsHandler = async () => {
    const responce = await gptFetchHandler(question, langCode);
    setAnswer((prev) => [...prev, [question, responce]]);
    setQuestion('');
};

    return (
        <>
            {!role 
                ?
                <div className={style.noRole}>Get autorisation</div>
                :
                <div className={style.wrapper}>
                    <div className={style.header}>
                        <div className={style.headerImg}>
                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAu3Z-QYTjKBTw10k7l6iJ7niTnWIfTejDg&usqp=CAU'}/>
                        </div>
                        <h1>GPT Helper</h1>
                    </div>
                    <div className={style.boxAnswers}>
                        {
                            answer.map((item) => {
                                if (item[0].length)
                                {return (
                                    <div key={new Date().getTime()}>
                                        <div className={style.wrapperQuestionUser}>
                                            <div className={style.userName}>{userName}:</div>
                                            <div className={style.questionUser}>{item[0]}</div>
                                        </div>
                                        <div className={style.wrapperAnswerGpt}>
                                            <div className={style.imgGpt}>
                                                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAu3Z-QYTjKBTw10k7l6iJ7niTnWIfTejDg&usqp=CAU'}/>
                                            </div>
                                            <div className={style.answerGpt}>{item[1]}</div>
                                        </div>
                                    </div>
                                )
                                }
                            })
                        }
                    </div>
                    <div className={style.textArea}>
                        <textarea 
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <button className={style.textAreaBtn} onClick={questionsHandler}>
                            <div className={style.btn}>
                                <div className={style.btnText}>Send</div>
                                <div className={style.btnImg}>
                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1VVlU386yK7dczAOayvv8sVuSRVB0cpGeOFg_z0MGOXgEE8TIzzxirxL71AD6enT7bUU&usqp=CAU'}/>
                                </div>
                            </div>
                        </button>
                        {showSpeechRec &&
                            <>
                                <button onClick={()=>{
                                                    SpeechRecognition.startListening({continuous: true, interimResults: true});
                                                    console.log('start =', SpeechRecognition.startListening({continuous: true, interimResults: true}).then(data => data));
                                                }}
                                >
                                    Start listening
                                </button>
                                &nbsp;
                                <button onClick={()=>{
                                        SpeechRecognition.stopListening();
                                    }}
                                >
                                    Stop listening
                                </button>
                                
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}