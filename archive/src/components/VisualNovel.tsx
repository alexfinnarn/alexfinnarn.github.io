// src/components/VisualNovel.tsx
import { Story } from 'inkjs';
import { useState, useEffect } from 'react';
import styles from './VisualNovel.module.css';

interface VisualNovelProps {
  storyData: string;
}

export default function VisualNovel({ storyData }: VisualNovelProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [currentText, setCurrentText] = useState('');
  const [choices, setChoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize the story when component mounts
  useEffect(() => {
    try {
      const newStory = new Story(storyData);
      setStory(newStory);
      continueStory(newStory);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load story:', error);
      setIsLoading(false);
    }
  }, [storyData]);

  // Continue the story and update UI
  const continueStory = (storyInstance: Story) => {
    let text = '';

    // Read all available content
    while (storyInstance.canContinue) {
      text += storyInstance.Continue();
    }

    setCurrentText(text.trim());

    // Update available choices
    if (storyInstance.currentChoices.length > 0) {
      setChoices(storyInstance.currentChoices);
    } else {
      setChoices([]);
    }
  };

  // Handle user choice selection
  const makeChoice = (choice: any) => {
    if (!story) return;

    // Make the choice in the story
    story.ChooseChoiceIndex(choice.index);

    // Continue with the story after choice
    continueStory(story);
  };

  // Restart the story
  const restartStory = () => {
    if (!story) return;

    story.ResetState();
    continueStory(story);
  };

  // Check if story has ended
  const isStoryEnded = story && !story.canContinue && choices.length === 0;

  if (isLoading) {
    return <div className={`${styles.visualNovel} ${styles.loading}`}>Loading story...</div>;
  }

  return (
    <div className={styles.visualNovel}>
      <div className={styles.storyContent}>
        <div className={styles.storyText}>
          {currentText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {choices.length > 0 && (
          <div className={styles.choices}>
            {choices.map((choice, index) => (
              <button
                key={index}
                className={styles.choiceButton}
                onClick={() => makeChoice(choice)}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {isStoryEnded && (
          <div className={styles.storyEnd}>
            <p>Thanks for reading my story!</p>
            <button onClick={restartStory} className={styles.restartButton}>
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
