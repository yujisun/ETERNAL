class StoryManager {
    constructor() {
        this.currentScene = 0;
        this.isTyping = false;
        this.isWaitingForClick = false;
        this.blinkInterval = null;
        this.room6PuzzleShown = false;
        this.scenes = [
            {
                image: 'room1.png',
                dialogue: null
            },
            {
                image: 'room2.png',
                dialogue: '아.. 여기가 어디지..?'
            },
            {
                image: 'room3.png',
                dialogue: '어? 문이 있잖아..? 뭐지.. 못보던 문인데.. 들어가도 되는건가..?'
            },
            {
                image: 'room4.png',
                dialogue: '영원한 영광.. 어두운건 싫지만.. 가보자..'
            },
            {
                image: 'room5.png',
                dialogue: '뭐지..? 생각보다 그렇게 어둡지는 않은데..? 어? 저기도 문이 있네..?'
            },
            {
                image: 'room6.png',
                dialogue: '응? 이건 또 뭐야? 거울에 뭐가 그려져있는데?'
            },
            {
                image: 'room7.png',
                dialogue: '아.. 거울로 비춰보았을 때 완성되는 모양이구나..'
            },
            {
                image: 'room8.png',
                dialogue: '여기도 문이 있네, 이번엔 무슨 문제지?'
            },
            {
                image: 'room9.png',
                dialogue: '음.. 어디보자.. 이 방 이름이.... 이기심이었지? 음... 이기심이라.. 언제부터더라...'
            },
            {
                image: 'room10.png',
                dialogue: '맞아.. 내 이 깊은 이기심.. 그것은 욕심(greed)에서 시작됐지..'
            },
            {
                image: 'room11.png',
                dialogue: '뭐야.. 점점 어두워지네..? 잘 안보여..'
            },
            {
                image: 'room12.png',
                dialogue: '흠.. 또 문제구나? 이 방이.. 무슨 방이었더라..?'
            },
            {
                image: 'room13.png',
                dialogue: '열렸다. 그래. 죄는 하나님을 떠나는 것에서 시작하지..'
            },
            {
                image: 'room14.png',
                dialogue: '이젠 잘 보이지도 않아..'
            },
            {
                image: 'room15.png',
                dialogue: '이게 뭐지..? 뭔가 찢어진 흔적 같은데..?'
            },
            {
                image: 'room16.png',
                dialogue: '나를 찢는.. 결국 죄는 나의 마음을 찢어가는 거구나..'
            },
            {
                image: 'room17.png',
                dialogue: '더이상은 안돼..! 이건 어두워도 너무 어둡잖아!'
            },
            {
                image: 'room18.png',
                dialogue: '이게.. 무엇을 뜻하는 걸까..'
            },
            {
                image: 'room19.png',
                dialogue: '무너짐.. 결국 이 후회의 방에선 나의 무너짐을 발견하는거구나..'
            },
            {
                image: 'room20-1.png',
                dialogue: '뭐야.. 너무 어두워.. 아무것도 보이지 않는다고!'
            },
            {
                image: 'room20.png',
                dialogue: '잠깐만.. 저게 뭐지?'
            },
            {
                image: 'room21.png',
                dialogue: '어? 문제다! 이 문제를 풀면 저 빛이 무엇인지 알 수 있는 걸까??'
            },
            {
                image: 'room22.png',
                dialogue: '아!! 저 빛은 십자가였구나?? ... 어? 그런데 왜 그동안 빛나지 않은거야..?'
            },
            {
                image: 'room23.png',
                dialogue: '어? 뭐지? 뭔가 표지판 같은데? 가는 길을 알려주는걸까..?'
            },
            {
                image: 'room24.png',
                dialogue: null // 룸24는 대사 없음
            },
            {
                image: 'room25.png',
                dialogue: '주님이 나를 부르시는구나! 영원한 영광의 길에 나를 부르고 계셔!'
            },
            {
                image: 'room26.png',
                dialogue: null // 룸26은 특별한 효과로 처리
            }
        ];
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
            });
        } else {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startStory();
            });
        }
    }
    
    startStory() {
        const startScreen = document.getElementById('start-screen');
        const storyScreen = document.getElementById('story-screen');
        
        if (startScreen && storyScreen) {
            startScreen.classList.remove('active');
            storyScreen.classList.add('active');
            this.showScene(0);
        }
    }
    
    async showScene(sceneIndex) {
        this.currentScene = sceneIndex;
        const scene = this.scenes[sceneIndex];
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) {
            console.error('필요한 요소를 찾을 수 없습니다');
            return;
        }
        
        // 이미지 설정
        if (scene.image) {
            if (storyImage.tagName === 'IMG') {
                storyImage.src = scene.image;
            } else {
                // div인 경우 텍스트로 표시
                storyImage.textContent = `룸 ${sceneIndex + 1}`;
                storyImage.style.backgroundColor = '#333';
                storyImage.style.color = 'white';
                storyImage.style.fontSize = '24px';
                storyImage.style.display = 'flex';
                storyImage.style.alignItems = 'center';
                storyImage.style.justifyContent = 'center';
            }
        }
        
        // 대사 처리
        if (sceneIndex === 0) {
            // 룸1: 자동으로 룸1-룸2-룸1-룸2 전환 후 룸2 대사 시작
            dialogueText.textContent = '';
            // 클릭 대기 없이 바로 전환 시퀀스 시작
            this.showRoom1To2Sequence();
        } else if (scene.dialogue || sceneIndex === 24) {  // 룸24도 포함
            if (sceneIndex === 1) {
                // 룸2: 두 번 클릭으로 진행, 마지막에 페이드 인 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('분명 수련회 첫째날을 잘 끝내고 자고 일어났는데.. 뭐야..', dialogueText, () => {
                            this.waitForClick(() => {
                                // 룸3으로 페이드 인 효과와 함께 전환
                                this.showRoom2To3Dissolve();
                            });
                        });
                    });
                });
            } else if (sceneIndex === 2) {
                // 룸3: 첫 번째 대사 후 화면 중앙에 글씨 표시, 그 다음 두 번째 대사
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        // 화면 중앙에 글씨 표시를 직접 실행
                        this.executeRoom3CenterText();
                    });
                });
            } else if (sceneIndex === 3) {
                // 룸4: 대사 후 페이드 효과로 룸5로 전환
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        // 페이드 효과로 룸5로 전환
                        this.showRoom4To5Fade();
                    });
                });
            } else if (sceneIndex === 4) {
                // 룸5: 두 번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('어? 잠겨있잖아..? 어떻게 열어야하는거지?', dialogueText, () => {
                            this.waitForClick(() => {
                                this.showScene(sceneIndex + 1);
                            });
                        });
                    });
                });
            } else if (sceneIndex === 5) {
                // 룸6: 두 번 클릭으로 진행, 마지막에 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('아.. 이걸 풀어야 문이 열리는 건가봐! 흠.. 이게 도대체 무엇을 뜻하는거지..?', dialogueText, () => {
                            // 두 번째 대사 후 정답창 표시
                            this.showAnswerBox('I', 
                                () => { 
                                    // 정답 시 룸7로 전환
                                    this.showRoom6To7Dissolve(); 
                                },
                                () => { 
                                    console.log('오답입니다. 다시 시도해주세요.');
                                }
                            );
                        });
                    });
                });
            } else if (sceneIndex === 6) {
                // 룸7: 두 번 클릭으로 진행, 마지막에 페이드 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('I.. \'나\'.. 결국 내 어둠으로 더 들어가는 건가..? 가보자. 나의 이기심 속으로..', dialogueText, () => {
                            this.waitForClick(() => {
                                // 페이드 효과로 룸8로 전환
                                this.showRoom7To8Fade();
                            });
                        });
                    });
                });
            } else if (sceneIndex === 7) {
                // 룸8: 대사 후 클릭하면 룸9로
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.showScene(sceneIndex + 1);
                    });
                });
            } else if (sceneIndex === 8) {
                // 룸9: 첫 번째 대사 후 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    // 첫 번째 대사 후 바로 정답창 표시
                    this.showAnswerBox('greeD', 
                        () => { 
                            // 정답 시 룸10으로 전환
                            this.showRoom9To10Dissolve(); 
                        },
                        () => { 
                            console.log('오답입니다. 다시 시도해주세요.');
                        }
                    );
                });
            } else if (sceneIndex === 9) {
                // 룸10: 세 번 클릭으로 진행, 마지막에 페이드 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('욕심.. 그게 내 안에 이렇게 깊이 자리잡고 있었구나..', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('그리고 그 욕심은 결국 나를 어둠 속으로 끌고 가고 있었어..', dialogueText, () => {
                                    this.waitForClick(() => {
                                        // 페이드 효과로 룸11로 전환
                                        this.showRoom10To11Fade();
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 10) {
                // 룸11: 두 번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('어.. 저 위에도 뭔가 있는 것 같은데...?', dialogueText, () => {
                            this.waitForClick(() => {
                                this.showScene(sceneIndex + 1);
                            });
                        });
                    });
                });
            } else if (sceneIndex === 11) {
                // 룸12: 두 번 클릭으로 진행, 마지막에 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('아..! 죄의 방! 흠.. 죄.. 죄는 나를 넘어뜨리는데...', dialogueText, () => {
                            // 두 번째 대사 후 정답창 표시
                            this.showAnswerBox('네 하나님을 떠나고', 
                                () => { 
                                    // 정답 시 룸13으로 전환
                                    this.showRoom12To13Dissolve(); 
                                },
                                () => { 
                                    console.log('오답입니다. 다시 시도해주세요.');
                                }
                            );
                        });
                    });
                });
            } else if (sceneIndex === 12) {
                // 룸13: 세 번 클릭으로 진행, 마지막에 페이드 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('난 얼마나 멀리 온 걸까.... 이런 내 모습 너무 부끄럽다..', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('이런 나에게.. 결국 남아있는 건 무엇인걸까....', dialogueText, () => {
                                    this.waitForClick(() => {
                                        // 페이드 효과로 룸14로 전환
                                        this.showRoom13To14Fade();
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 13) {
                // 룸14: 두 번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('그래도.. 한 번 가보자..', dialogueText, () => {
                            this.waitForClick(() => {
                                this.showScene(sceneIndex + 1);
                            });
                        });
                    });
                });
            } else if (sceneIndex === 14) {
                // 룸15: 세 번 클릭으로 진행, 마지막에 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('아.. 상처의 방.. 그래.. 결국 죄는 찢어지는 상처를 남기기 마련이지..', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('이 퍼즐을 다시 완성하면 정답을 알 수 있는건가?', dialogueText, () => {
                                    // 세 번째 대사 후 정답창 표시
                                    this.showAnswerBox('ME', 
                                        () => { 
                                            // 정답 시 룸16으로 전환
                                            this.showRoom15To16Dissolve(); 
                                        },
                                        () => { 
                                            console.log('오답입니다. 다시 시도해주세요.');
                                        }
                                    );
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 15) {
                // 룸16: 다섯 번 클릭으로 진행, 마지막에 페이드 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('그래, 결국 내 안에 이기심과 죄는 나를 상처입힐 뿐이야..', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('이 상처를 숨기고 살았다고 생각했는데.... 내 속은 이렇게 어두워져 가고 있었구나.....', dialogueText, () => {
                                    this.waitForClick(() => {
                                        this.typeText('앞으로 어떻게 해야 하는 걸까... 다음 방으로 갈 용기가 없어....', dialogueText, () => {
                                            this.waitForClick(() => {
                                                this.typeText('그래도.. 가야겠지..? 포기하지 말자.. 영원한 영광을 위해..', dialogueText, () => {
                                                    this.waitForClick(() => {
                                                        // 페이드 효과로 룸17으로 전환
                                                        this.showRoom16To17Fade();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 16) {
                // 룸17: 네 번 클릭으로 진행, 마지막에 룸18로 전환
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('내 안이 이렇게 어두워진 줄 몰랐어.... 언제까지 이렇게 어두워질거야!!', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('정말! 이 문을 열고 또 열면, 밝아지긴 하는거야?', dialogueText, () => {
                                    this.waitForClick(() => {
                                        this.typeText('… 하.. 너무 쉽지 않아.. 그동안의 삶이 후회가 돼...... 그래도 한번 더.. 도전해보자..', dialogueText, () => {
                                            this.waitForClick(() => {
                                                // 룸18로 전환
                                                this.showScene(sceneIndex + 1);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 17) {
                // 룸18: 첫 번째 대사 후 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    // 첫 번째 대사 후 바로 정답창 표시
                    this.showAnswerBox('무너짐', 
                        () => { 
                            // 정답 시 룸19로 전환
                            this.showRoom18To19Dissolve(); 
                        },
                        () => { 
                            console.log('오답입니다. 다시 시도해주세요.');
                        }
                    );
                });
            } else if (sceneIndex === 18) {
                // 룸19: 네 번 클릭으로 진행, 마지막에 페이드 효과
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('그래.. 난 무너졌어.. 그래서 지난 날이 너무 후회 돼..... 다시 세워질 수 있는 걸까.....', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('누가.. 누가 저 좀 도와주세요..', dialogueText, () => {
                                    this.waitForClick(() => {
                                        this.typeText('이 작아진 외로움의 방 문처럼.. 작아진 저를 견디기 너무 힘들어요..', dialogueText, () => {
                                            this.waitForClick(() => {
                                                // 페이드 효과로 룸20-1로 전환
                                                this.showRoom19To20_1Fade();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 19) {
                // 룸20-1: 네 번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('저기요! 누구 없어요?', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('저 좀 도와주세요! 너무 어두워서 혼자 있고 싶지 않아요!', dialogueText, () => {
                                    this.waitForClick(() => {
                                        this.typeText('제발...... 제발.. 저 좀 도와주세요!', dialogueText, () => {
                                            this.waitForClick(() => {
                                                this.showScene(sceneIndex + 1);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 20) {
                // 룸21: 두 번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('언제부터 저기에서 빛나고 있었던걸까...?', dialogueText, () => {
                            this.waitForClick(() => {
                                this.showScene(sceneIndex + 1);
                            });
                        });
                    });
                });
            } else if (sceneIndex === 21) {
                // 룸21: 첫 번째 대사 후 정답창 표시
                this.typeText(scene.dialogue, dialogueText, () => {
                    // 첫 번째 대사 후 바로 정답창 표시
                    this.showAnswerBox('십자가', 
                        () => { 
                            // 정답 시 룸22로 전환
                            this.showRoom21To22BrightDissolve(); 
                        },
                        () => { 
                            console.log('오답입니다. 다시 시도해주세요.');
                        }
                    );
                });
            } else if (sceneIndex === 22) {
                // 룸22: 특별한 전환 시퀀스 실행 후 새로운 대사들
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        // 특별한 전환 시퀀스 시작
                        this.showRoom22SpecialSequence();
                    });
                });
            } else if (sceneIndex === 23) {
                // 룸23: 대사 표시 후 클릭하면 룸24로
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.showScene(sceneIndex + 1);
                    });
                });
            } else if (sceneIndex === 24) {
                // 룸24: 전환 후 정답창 표시 (대사 없지만 정답창 필요)
                this.showAnswerBox('사랑한다 내 자녀야', 
                    () => { 
                        // 정답 시 룸25로 전환
                        this.showScene(sceneIndex + 1); 
                    },
                    () => { 
                        console.log('오답입니다. 다시 시도해주세요.');
                    }
                );
            } else if (sceneIndex === 25) {
                // 룸25: 첫 번째 대사부터 시작하여 총 5번 클릭으로 진행
                this.typeText(scene.dialogue, dialogueText, () => {
                    this.waitForClick(() => {
                        this.typeText('나를 사랑하셔서 이 땅에 오셨다고, 말씀으로 알려주시고 계셔!', dialogueText, () => {
                            this.waitForClick(() => {
                                this.typeText('말씀 안에 다 들어있어! 내가 얼마나 사랑 받는 자녀인지..!', dialogueText, () => {
                                    this.waitForClick(() => {
                                        this.typeText('주님.. 감사합니다! 저 이제 계속 걸어갈게요..', dialogueText, () => {
                                            this.waitForClick(() => {
                                                this.typeText('영원한 영광, 그 길을 향해서..!', dialogueText, () => {
                                                    this.waitForClick(() => {
                                                        // 원래대로 룸26으로 전환
                                                        this.showScene(sceneIndex + 1);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (sceneIndex === 26) {
                // 룸26: 특별한 흰색 디졸브 효과
                this.showRoom26FinalSequence();
            } else {
                // 나머지 룸들: 한 번 클릭으로 진행
                this.waitForClick(() => this.showScene(sceneIndex + 1));
            }
        } else {
            // 대사가 없으면 바로 다음으로 (룸26)
            this.showRoom26FinalSequence();
        }
    }
    
    // 룸1에서 룸2로의 빠른 전환 시퀀스
    showRoom1To2Sequence() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 룸1 → 룸2 (1초)
        storyImage.src = 'room2.png';
        setTimeout(() => {
            // 룸2 → 룸1 (1초)
            storyImage.src = 'room1.png';
            setTimeout(() => {
                // 룸1 → 룸2 (1초)
                storyImage.src = 'room2.png';
                setTimeout(() => {
                    // 룸2에서 대사 시작
                    this.showScene(1);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    // 룸2에서 룸3으로의 디졸브 효과
    showRoom2To3Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 룸3 이미지를 미리 로드
        const room3Image = new Image();
        room3Image.src = 'room3.png';
        
        room3Image.onload = () => {
            // 디졸브 효과 시작
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            
            // 룸2 이미지를 페이드아웃
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                // 룸3 이미지로 변경하고 페이드인
                storyImage.src = 'room3.png';
                storyImage.style.opacity = '1';
                
                // 페이드인 완료 후 룸3의 대사 시작
                setTimeout(() => {
                    // 대화창 초기화 후 룸3 대사 표시
                    dialogueText.textContent = '';
                    this.showScene(2);
                }, 750); // 페이드인 완료 후
            }, 750); // 절반 지점에서 이미지 변경
        };
    }
    
    // 룸3에서 룸4로의 디졸브 효과
    showRoom3To4Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 룸4 이미지를 미리 로드
        const room4Image = new Image();
        room4Image.src = 'room4.png';
        
        room4Image.onload = () => {
            // 디졸브 효과 시작
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            
            // 룸3 이미지를 페이드아웃
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                // 룸4 이미지로 변경하고 페이드인
                storyImage.src = 'room4.png';
                storyImage.style.opacity = '1';
                
                // 페이드인 완료 후 룸4의 대사 시작
                setTimeout(() => {
                    // 대화창 초기화 후 룸4 대사 표시
                    dialogueText.textContent = '';
                    this.showScene(3);
                }, 750); // 페이드인 완료 후
            }, 750); // 절반 지점에서 이미지 변경
        };
    }

    // 룸4에서 룸5로의 페이드 효과
    showRoom4To5Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 현재 이미지를 페이드 아웃
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            // 룸5 이미지로 변경
            storyImage.src = 'room5.png';
            // 페이드 인 효과
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            
            // 페이드인 완료 후 룸5의 대사 시작
            setTimeout(() => {
                // 대화창 초기화 후 룸5 대사 표시
                dialogueText.textContent = '';
                this.showScene(4);
            }, 1000); // 페이드인 완료 후
        }, 1000);
    }
    
    // 룸6에서 룸7로의 디졸브 효과
    showRoom6To7Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 룸7 이미지를 미리 로드
        const room7Image = new Image();
        room7Image.src = 'room7.png';
        
        room7Image.onload = () => {
            // 디졸브 효과 시작
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            
            // 룸6 이미지를 페이드아웃
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                // 룸7 이미지로 변경하고 페이드인
                storyImage.src = 'room7.png';
                storyImage.style.opacity = '1';
                
                // 룸7의 대사 시작
                this.showScene(6);
            }, 750); // 절반 지점에서 이미지 변경
        };
    }
    
    // 룸7에서 룸8로의 페이드 효과
    showRoom7To8Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 현재 이미지를 페이드 아웃
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            // 룸8 이미지로 변경
            storyImage.src = 'room8.png';
            // 페이드 인 효과
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            
            // 룸8의 대사 시작
            this.showScene(7);
        }, 1000);
    }
    
    // 룸9에서 룸10으로의 디졸브 효과
    showRoom9To10Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room10Image = new Image();
        room10Image.src = 'room10.png';
        
        room10Image.onload = () => {
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                storyImage.src = 'room10.png';
                storyImage.style.opacity = '1';
                this.showScene(9);
            }, 750);
        };
    }
    
    // 룸10에서 룸11으로의 페이드 효과
    showRoom10To11Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            storyImage.src = 'room11.png';
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            this.showScene(10);
        }, 1000);
    }
    
    // 룸12에서 룸13으로의 디졸브 효과
    showRoom12To13Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room13Image = new Image();
        room13Image.src = 'room13.png';
        
        room13Image.onload = () => {
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                storyImage.src = 'room13.png';
                storyImage.style.opacity = '1';
                this.showScene(12);
            }, 750);
        };
    }
    
    // 룸13에서 룸14로의 페이드 효과
    showRoom13To14Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            storyImage.src = 'room14.png';
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            this.showScene(13);
        }, 1000);
    }
    
    // 룸15에서 룸16으로의 디졸브 효과
    showRoom15To16Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room16Image = new Image();
        room16Image.src = 'room16.png';
        
        room16Image.onload = () => {
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                storyImage.src = 'room16.png';
                storyImage.style.opacity = '1';
                this.showScene(15);
            }, 750);
        };
    }
    
    // 룸16에서 룸17으로의 페이드 효과
    showRoom16To17Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            storyImage.src = 'room17.png';
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            this.showScene(16);
        }, 1000);
    }
    
    // 룸18에서 룸19로의 디졸브 효과
    showRoom18To19Dissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room19Image = new Image();
        room19Image.src = 'room19.png';
        
        room19Image.onload = () => {
            storyImage.style.transition = 'opacity 1.5s ease-in-out';
            storyImage.style.opacity = '0';
            
            setTimeout(() => {
                storyImage.src = 'room19.png';
                storyImage.style.opacity = '1';
                this.showScene(18);
            }, 750);
        };
    }
    
    // 룸19에서 룸20-1로의 페이드 효과
    showRoom19To20_1Fade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        storyImage.style.transition = 'opacity 1s ease-out';
        storyImage.style.opacity = '0';
        
        setTimeout(() => {
            storyImage.src = 'room20-1.png';
            storyImage.style.transition = 'opacity 1s ease-in';
            storyImage.style.opacity = '1';
            this.showScene(19);
        }, 1000);
    }
    
    // 룸26 최종 시퀀스
    showRoom26FinalSequence() {
        const dialogueContainer = document.querySelector('.dialogue-container');
        if (!dialogueContainer) return;
        
        // 대화창을 완전히 숨김
        dialogueContainer.style.display = 'none';
        
        // 흰색 디졸브 글씨 표시 (화면 중앙에)
        this.showFinalDissolveText([
            '영원한 영광으로 가는 그 길은',
            '나의 어둠을 직면하는 것에서 시작합니다.',
            '어둠은 우리를 무너뜨리는 것이 아닌',
            '주님을 바라볼 수 있는 기회가 됩니다.',
            '어떠한 어둠 속에서도 늘 십자가의 빛을 바라보며',
            '이 길을 걸어가는 \'당신\'',
            '그 걸음을 늘 응원합니다.'
        ], () => {
            // 최종 메시지 표시
            this.showFinalMessage();
        });
    }
    
    // 최종 디졸브 텍스트 (흰색)
    showFinalDissolveText(textLines, onComplete) {
        const dialogueContainer = document.querySelector('.dialogue-container');
        if (!dialogueContainer) return;
        
        dialogueContainer.style.display = 'block';
        dialogueContainer.style.opacity = '1';
        
        const dialogueText = document.getElementById('dialogue-text');
        if (!dialogueText) return;
        
        // 텍스트를 가운데 정렬로 설정
        dialogueText.style.textAlign = 'center';
        
        let currentLine = 0;
        
        const showNextLine = () => {
            if (currentLine >= textLines.length) {
                if (onComplete) onComplete();
                return;
            }
            
            // 흰색 글씨로 설정
            dialogueText.style.color = '#FFFFFF';
            dialogueText.style.fontSize = '18px';
            dialogueText.style.fontWeight = 'bold';
            dialogueText.textContent = textLines[currentLine];
            
            currentLine++;
            
            // 2초 후 다음 줄 표시
            setTimeout(showNextLine, 2000);
        };
        
        showNextLine();
    }
    
    // 최종 메시지 표시
    showFinalMessage() {
        const dialogueText = document.getElementById('dialogue-text');
        if (!dialogueText) return;
        
        // 텍스트를 가운데 정렬로 설정
        dialogueText.style.textAlign = 'center';
        
        // 흰색으로 전환된 뒤 최종 메시지
        dialogueText.style.color = '#FFFFFF';
        dialogueText.style.fontSize = '20px';
        dialogueText.style.fontWeight = 'bold';
        dialogueText.textContent = '어둠 속에서, 영원한 영광으로';
        
        setTimeout(() => {
            dialogueText.textContent = 'THE END';
            
            // 3초 후 클릭하면 재시작
            setTimeout(() => {
                const dialogueContainer = document.querySelector('.dialogue-container');
                if (dialogueContainer) {
                    dialogueContainer.style.cursor = 'pointer';
                    dialogueContainer.addEventListener('click', () => {
                        location.reload();
                    }, { once: true });
                }
            }, 3000);
        }, 3000);
    }
    
    typeText(text, element, onComplete) {
        // 기존 텍스트를 완전히 지우고 시작
        element.textContent = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent = text.substring(0, index + 1);
                index++;
            } else {
                clearInterval(typeInterval);
                if (onComplete) onComplete();
            }
        }, 50);
    }
    
    waitForClick(onClick) {
        const dialogueContainer = document.querySelector('.dialogue-container');
        if (dialogueContainer) {
            dialogueContainer.style.cursor = 'pointer';
            
            const clickHandler = () => {
                dialogueContainer.style.cursor = 'default';
                dialogueContainer.removeEventListener('click', clickHandler);
                if (onClick) onClick();
            };
            
            dialogueContainer.addEventListener('click', clickHandler);
        }
    }
    
    showDissolveText(textLines, onComplete) {
        const dialogueContainer = document.querySelector('.dialogue-container');
        if (!dialogueContainer) return;
        
        dialogueContainer.style.display = 'block';
        dialogueContainer.style.opacity = '1';
        
        const dialogueText = document.getElementById('dialogue-text');
        if (!dialogueText) return;
        
        let currentLine = 0;
        
        const showNextLine = () => {
            if (currentLine >= textLines.length) {
                if (onComplete) onComplete();
                return;
            }
            
            // 갈색 글씨로 설정
            dialogueText.style.color = '#8B4513';
            dialogueText.style.fontSize = '18px';
            dialogueText.style.fontWeight = 'bold';
            dialogueText.textContent = textLines[currentLine];
            
            currentLine++;
            
            // 2초 후 다음 줄 표시
            setTimeout(showNextLine, 2000);
        };
        
        showNextLine();
    }
    
    showRoom3DarknessDialogue() {
        const dialogueContainer = document.querySelector('.dialogue-container');
        if (!dialogueContainer) return;
        
        dialogueContainer.style.display = 'block';
        dialogueContainer.style.opacity = '1';
        
        const dialogueText = document.getElementById('dialogue-text');
        if (!dialogueText) return;
        
        // 일반 대화 스타일로 복원
        dialogueText.style.color = '';
        dialogueText.style.fontSize = '';
        dialogueText.style.fontWeight = '';
        
        // 0.5초 후 대사 타이핑 시작
        setTimeout(() => {
            this.typeText('짙은 어둠..? 어둠은 별론데.. 그래도 가봐야지 뭐..', dialogueText, () => {
                // 대사가 끝나면 클릭 대기
                this.waitForClick(() => {
                    this.showScene(3); // 룸4로 전환
                });
            });
        }, 500);
    }

    // 룸21에서 룸22로의 밝은 디졸브 효과
    showRoom21To22BrightDissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room22Image = new Image();
        room22Image.src = 'room22.png';
        
        room22Image.onload = () => {
            // 흰색 오버레이를 만들어서 밝은 디졸브 효과 구현
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '10';
            
            storyImage.parentElement.style.position = 'relative';
            storyImage.parentElement.appendChild(overlay);
            
            // 흰색으로 밝아지면서
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                // 이미지 변경
                storyImage.src = 'room22.png';
                // 흰색에서 원래으로
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                    this.showScene(22);  // ← 수정: 룸22로 전환
                }, 1500);
            }, 750);
        };
    }
    
    // 룸22에서 룸23으로의 밝은 디졸브 효과
    showRoom22To23BrightDissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room23Image = new Image();
        room23Image.src = 'room23.png';
        
        room23Image.onload = () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '10';
            
            storyImage.parentElement.style.position = 'relative';
            storyImage.parentElement.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                storyImage.src = 'room23.png';
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                    this.showScene(23);  // ← 룸23으로 전환
                }, 1500);
            }, 750);
        };
    }
    
    // 룸23에서 룸24로의 밝은 디졸브 효과
    showRoom23To24BrightDissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room24Image = new Image();
        room24Image.src = 'room24.png';
        
        room24Image.onload = () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '10';
            
            storyImage.parentElement.style.position = 'relative';
            storyImage.parentElement.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                storyImage.src = 'room24.png';
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                    this.showScene(23);
                }, 1500);
            }, 750);
        };
    }
    
    // 룸25에서 룸26으로의 밝은 페이드 효과
    showRoom25To26BrightFade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 흰색 오버레이로 밝은 페이드 효과
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'white';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 1s ease-in-out';
        overlay.style.zIndex = '10';
        
        storyImage.parentElement.style.position = 'relative';
        storyImage.parentElement.appendChild(overlay);
        
        // 흰색으로 밝아지면서
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            // 룸26 이미지로 변경
            storyImage.src = 'room26.png';
            
            // 오버레이 제거
            overlay.remove();
            
            // 룸26 최종 시퀀스 시작
            this.showRoom26FinalSequence();
        }, 1000);
    }

    // 룸22 특별한 전환 시퀀스
    showRoom22SpecialSequence() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 대사 숨기기
        dialogueText.textContent = '';
        
        // 하단 네모 상자(대화창 배경) 숨기기
        dialogueText.style.backgroundColor = 'transparent';
        dialogueText.style.border = 'none';
        dialogueText.style.boxShadow = 'none';
        
        // Room3, room5, room8, room11, room14, room17, room20 순서대로 1초씩 전환
        const rooms = ['room3.png', 'room5.png', 'room8.png', 'room11.png', 'room14.png', 'room17.png', 'room20.png'];
        let currentIndex = 0;
        
        const showNextRoom = () => {
            if (currentIndex < rooms.length) {
                storyImage.src = rooms[currentIndex];
                currentIndex++;
                setTimeout(showNextRoom, 1000);
            } else {
                // 모든 룸을 보여준 후 다시 룸22로 돌아가기
                setTimeout(() => {
                    storyImage.src = 'room22.png';
                    // 새로운 대사들 시작
                    this.showRoom22NewDialogues();
                }, 1000);
            }
        };
        
        // 시퀀스 시작
        showNextRoom();
    }

    // 룸22 새로운 대사들
    showRoom22NewDialogues() {
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!dialogueText) return;
        
        // 하단 네모 상자(대화창 배경) 복원
        dialogueText.style.backgroundColor = '';
        dialogueText.style.border = '';
        dialogueText.style.boxShadow = '';
        
        const dialogues = [
            '어..? 십자가는 계속 나를 비추고 있었네..',
            '십자가는 늘 나를 향해있었지만.. 어둡지 않아서 그 빛을 보지 못했던거야..!',
            '예수님은 날 혼자 두신게 아니야. 날 어둠에 버리신게 아니었어..!',
            '어둠 속에서 더 선명한 빛을 볼 수 있도록 날 인도하신거였어!',
            '영원한 영광으로 가는 첫 걸음… 이거구나! 이제 알았어! 어디를 향해 가야하는지...!',
            '자! 저 십자가를 향해 걸어가자!'
        ];
        
        let currentIndex = 0;
        
        const showNextDialogue = () => {
            if (currentIndex < dialogues.length) {
                this.typeText(dialogues[currentIndex], dialogueText, () => {
                    this.waitForClick(() => {
                        currentIndex++;
                        showNextDialogue();
                    });
                });
            } else {
                // 모든 대사가 끝나면 룸23으로 전환
                this.showScene(23);
            }
        };
        
        // 첫 번째 대사 시작
        showNextDialogue();
    }

    // 룸22에서 룸23으로의 밝은 디졸브 효과
    showRoom22To23BrightDissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room23Image = new Image();
        room23Image.src = 'room23.png';
        
        room23Image.onload = () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '10';
            
            storyImage.parentElement.style.position = 'relative';
            storyImage.parentElement.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                storyImage.src = 'room23.png';
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                    this.showScene(23);  // ← 룸23으로 전환
                }, 1500);
            }, 750);
        };
    }
    
    // 룸23에서 룸24로의 밝은 디졸브 효과
    showRoom23To24BrightDissolve() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        const room24Image = new Image();
        room24Image.src = 'room24.png';
        
        room24Image.onload = () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'white';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '10';
            
            storyImage.parentElement.style.position = 'relative';
            storyImage.parentElement.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                storyImage.src = 'room24.png';
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                    this.showScene(23);
                }, 1500);
            }, 750);
        };
    }
    
    // 룸25에서 룸26으로의 밝은 페이드 효과
    showRoom25To26BrightFade() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 흰색 오버레이로 밝은 페이드 효과
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'white';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 1s ease-in-out';
        overlay.style.zIndex = '10';
        
        storyImage.parentElement.style.position = 'relative';
        storyImage.parentElement.appendChild(overlay);
        
        // 흰색으로 밝아지면서
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            // 룸26으로 전환 (특별한 효과)
            this.showRoom26FinalSequence();
        }, 1000);
    }

    // 룸3 중앙 글씨 실행 (인라인 버전)
    executeRoom3CenterText() {
        const storyImage = document.getElementById('story-image');
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!storyImage || !dialogueText) return;
        
        // 대화창의 배경(검정 박스)만 숨기기
        dialogueText.style.backgroundColor = 'transparent';
        dialogueText.style.border = 'none';
        dialogueText.style.boxShadow = 'none';
        
        // 화면 중앙에 글씨를 표시할 오버레이 생성
        const centerTextOverlay = document.createElement('div');
        centerTextOverlay.style.position = 'absolute';
        centerTextOverlay.style.top = '50%';
        centerTextOverlay.style.left = '50%';
        centerTextOverlay.style.transform = 'translate(-50%, -50%)';
        centerTextOverlay.style.color = '#8B4513';
        centerTextOverlay.style.fontSize = '16px';
        centerTextOverlay.style.fontWeight = 'bold';
        centerTextOverlay.style.textAlign = 'center';
        centerTextOverlay.style.zIndex = '20';
        centerTextOverlay.style.textShadow = 'none';
        centerTextOverlay.style.maxWidth = '95%';
        centerTextOverlay.style.lineHeight = '1.4';
        centerTextOverlay.style.opacity = '0';
        centerTextOverlay.style.transition = 'opacity 1.5s ease-in-out';
        centerTextOverlay.style.padding = '0';
        
        // 한 줄씩 등장할 텍스트들
        const textLines = [
            '영원한 영광을 위한 첫 걸음,',
            '그것은 어둠을 직면하는 것이다.',
            '짙은 어둠에 도망치고 싶다면..',
            '기회는 지금뿐..'
        ];
        
        // 모든 텍스트를 한 번에 표시
        centerTextOverlay.innerHTML = textLines.map(line => `<div style="margin: 8px 0;">${line}</div>`).join('');
        
        // 이미지 컨테이너에 오버레이 추가
        storyImage.parentElement.style.position = 'relative';
        storyImage.parentElement.appendChild(centerTextOverlay);
        
        // 디졸브 효과로 페이드인
        setTimeout(() => {
            centerTextOverlay.style.opacity = '1';
        }, 100);
        
        // 6초 후 디졸브 효과로 페이드아웃
        setTimeout(() => {
            centerTextOverlay.style.opacity = '0';
            
            // 페이드아웃 완료 후 제거
            setTimeout(() => {
                centerTextOverlay.remove();
                // 대화창 배경을 다시 보이게 하기
                dialogueText.style.backgroundColor = '';
                dialogueText.style.border = '';
                dialogueText.style.boxShadow = '';
                // 룸3의 두 번째 대사 표시
                this.showRoom3SecondDialogue();
            }, 1500);
        }, 6000);
    }

    // 룸3 두 번째 대사 표시
    showRoom3SecondDialogue() {
        const dialogueText = document.getElementById('dialogue-text');
        
        if (!dialogueText) return;
        
        // 두 번째 대사 표시
        this.typeText('짙은.. 어둠이라.. 어둠은 좀 별론데....', dialogueText, () => {
            this.waitForClick(() => {
                // 룸4로 전환
                this.showRoom3To4Dissolve();
            });
        });
    }

    // 정답창 표시 함수
    showAnswerBox(correctAnswer, onCorrect, onIncorrect) {
        // 기존 정답창이 있다면 제거
        const existingAnswerBox = document.querySelector('.answer-box');
        if (existingAnswerBox) {
            existingAnswerBox.remove();
        }
        
        // 정답창 컨테이너 생성 (한 줄 느낌)
        const answerBox = document.createElement('div');
        answerBox.className = 'answer-box';
        answerBox.style.cssText = `
            position: fixed;
            bottom: 180px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.9);
            padding: 15px;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 15px;
            border-radius: 8px;
        `;
        
        // 입력창
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '정답을 입력하세요...';
        input.style.cssText = `
            padding: 10px;
            border: 1px solid #fff;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.9);
            color: #000;
            font-size: 16px;
            text-align: center;
        `;
        
        // 오픈 버튼 (오른쪽에 배치)
        const submitBtn = document.createElement('button');
        submitBtn.textContent = '오픈';
        submitBtn.style.cssText = `
            padding: 10px 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
        `;
        
        // 버튼 호버 효과
        submitBtn.onmouseover = () => {
            submitBtn.style.background = 'rgba(0, 0, 0, 0.9)';
        };
        submitBtn.onmouseout = () => {
            submitBtn.style.background = 'rgba(0, 0, 0, 0.7)';
        };
        
        // 정답 확인 로직 (대소문자 구분)
        const checkAnswer = () => {
            const userAnswer = input.value.trim();
            const correct = correctAnswer;
            
            if (userAnswer === correct) {
                // 정답 시 바로 다음 장면으로
                answerBox.remove();
                if (onCorrect) onCorrect();
            } else {
                // 오답 시 대화창에 요청한 메시지만 표시
                const dialogueText = document.getElementById('dialogue-text');
                if (dialogueText) {
                    dialogueText.textContent = '아.. 아니네.. 다시 생각해보자..';
                }
                
                // 입력창 초기화 및 포커스
                input.value = '';
                input.focus();
                
                if (onIncorrect) onIncorrect();
            }
        };
        
        // 이벤트 리스너
        submitBtn.onclick = checkAnswer;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        };
        
        // 정답창에 요소들 추가 (한 줄로 배치)
        answerBox.appendChild(input);
        answerBox.appendChild(submitBtn);
        
        // 페이지에 추가
        document.body.appendChild(answerBox);
        
        // 입력창에 포커스
        input.focus();
    }
}

// 스토리 매니저 초기화
const storyManager = new StoryManager();
storyManager.init();
  