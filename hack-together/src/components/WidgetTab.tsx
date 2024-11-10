/*import React, { useState } from 'react';

function WidgetTab() {
  const [activeTab, setActiveTab] = useState(1);
  const [isTemplatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);

  const toggleTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const copyLink = () => {
    const linkText = "Link: This is a test link";
    navigator.clipboard.writeText(linkText)
      .then(() => alert('Link copied to clipboard!'))
      .catch((err) => console.error('Failed to copy text:', err));
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length > 0) {
      alert(`File uploaded: ${event.target.files[0].name}`);
    }
  };

  const submitQuestion = () => {
    const questionText = document.getElementById('question-text').value;
    if (questionText) {
      alert(`Question submitted: ${questionText}`);
      setQuestionModalOpen(false);
    }
  };

  return (
    <div className="window">
      <div className="tabs">
        <div className="tab" onClick={() => toggleTab(1)}>Tab 1</div>
        <div className="tab" onClick={() => toggleTab(2)}>Tab 2</div>
        <div className="tab" onClick={() => toggleTab(3)}>Tab 3</div>
      </div>

      <div className="interior">
        {activeTab === 1 && (
          <div className="content">
            <h2>Tab 1</h2>
            <button onClick={copyLink}>Copy Link</button>
            <p>Link: This is a test link</p>
          </div>
        )}
        {activeTab === 2 && (
          <div className="content">
            <h2>Tab 2</h2>
            <button onClick={() => setTemplatesModalOpen(true)}>Select Template</button>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={() => toggleTab(4)}>Permissions</button>
          </div>
        )}
        {activeTab === 3 && (
          <div className="content">
            <h2>Tab 3</h2>
            <button onClick={() => setQuestionModalOpen(true)}>Questions</button>
          </div>
        )}
        {activeTab === 4 && (
          <div className="content">
            <h2>Permissions</h2>
            <button onClick={() => toggleTab(1)}>Return Back</button>
          </div>
        )}
      </div>

      {isTemplatesModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setTemplatesModalOpen(false)}>&times;</span>
            <h2>Select a Template</h2>
            <button onClick={() => alert('Template 1 selected')}>Template 1</button>
            <button onClick={() => alert('Template 2 selected')}>Template 2</button>
            <button onClick={() => alert('Template 3 selected')}>Template 3</button>
          </div>
        </div>
      )}

      {isQuestionModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setQuestionModalOpen(false)}>&times;</span>
            <h2>Ask a Question</h2>
            <textarea id="question-text"></textarea><br />
            <button onClick={submitQuestion}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WidgetTab;
*/