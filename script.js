document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailForm');
    const submitBtn = document.getElementById('submitBtn');
    const emailTemplates = document.getElementById('emailTemplates');
    const messageTextarea = document.getElementById('message');
    const subjectInput = document.getElementById('subject');

    // Email templates data (signatures will be added automatically by server)
    const templates = {
        business_inquiry: {
            subject: "Business Inquiry - [Your Company Name]",
            message: `Dear [Recipient Name],

I hope this email finds you well. I am writing to inquire about potential business opportunities between our organizations.

I would like to discuss:
• [Topic 1]
• [Topic 2]
• [Topic 3]

I believe there could be mutual benefits in exploring a partnership. Would you be available for a brief call or meeting next week to discuss this further?

I look forward to hearing from you.

Best regards,
IMRAN HOSSEN`
        },
        job_application: {
            subject: "Application for [Position Name] - [Your Name]",
            message: `Dear Hiring Manager,

I am writing to express my strong interest in the [Position Name] role at [Company Name]. With my background in [Your Field/Experience], I am confident I would be a valuable addition to your team.

Key qualifications I bring:
• [Qualification 1]
• [Qualification 2]
• [Qualification 3]

I have attached my resume for your review and would welcome the opportunity to discuss how my skills and experience align with your needs.

Thank you for your time and consideration.

Best regards,
IMRAN HOSSEN`
        },
        meeting_request: {
            subject: "Meeting Request - [Topic]",
            message: `Dear [Recipient Name],

I hope you are doing well. I would like to schedule a meeting to discuss [specific topic/project].

Proposed meeting details:
• Duration: [Duration]
• Preferred dates: [Date options]
• Format: [In-person/Virtual]
• Agenda: [Brief agenda items]

Please let me know what works best for your schedule. I am flexible with timing and can adjust to accommodate your availability.

Looking forward to our discussion.

Best regards,
IMRAN HOSSEN`
        },
        follow_up: {
            subject: "Following Up - [Previous Topic]",
            message: `Dear [Recipient Name],

I hope you are well. I wanted to follow up on our previous conversation regarding [topic/project].

As discussed, I wanted to:
• [Action item 1]
• [Action item 2]
• [Action item 3]

Please let me know if you need any additional information or if there are next steps we should consider.

Thank you for your time and consideration.

Best regards,
IMRAN HOSSEN`
        },
        project_proposal: {
            subject: "Project Proposal - [Project Name]",
            message: `Dear [Recipient Name],

I hope this email finds you well. I am pleased to present a project proposal for [Project Name] that I believe will bring significant value to your organization.

Project Overview:
• Objective: [Main objective]
• Timeline: [Expected timeline]
• Key deliverables: [Main deliverables]
• Investment: [Budget/resources needed]

I would be happy to discuss this proposal in detail and answer any questions you may have. Are you available for a call or meeting next week?

Thank you for considering this opportunity.

Best regards,
IMRAN HOSSEN`
        },
        thank_you: {
            subject: "Thank You - [Occasion/Reason]",
            message: `Dear [Recipient Name],

I wanted to take a moment to express my sincere gratitude for [specific reason].

Your [support/assistance/collaboration] has been invaluable, and I truly appreciate:
• [Specific thing 1]
• [Specific thing 2]
• [Specific thing 3]

Thanks to your help, [positive outcome/result]. I look forward to continuing our [relationship/collaboration/partnership].

With heartfelt thanks,
IMRAN HOSSEN`
        },
        introduction: {
            subject: "Introduction - [Your Name] from [Your Company]",
            message: `Dear [Recipient Name],

I hope this email finds you well. My name is [Your Name], and I am [Your Title] at [Your Company].

I am reaching out because [reason for introduction/connection]. I believe we may have some common interests or opportunities for collaboration in [relevant area].

A bit about me:
• [Background point 1]
• [Background point 2]
• [Background point 3]

I would love to learn more about your work and explore potential synergies. Would you be open to a brief call or coffee meeting?

Looking forward to connecting.

Best regards,
IMRAN HOSSEN`
        },
        collaboration: {
            subject: "Collaboration Opportunity - [Project/Initiative Name]",
            message: `Dear [Recipient Name],

I hope you are doing well. I am reaching out to discuss a potential collaboration opportunity that I believe could be mutually beneficial.

Collaboration Overview:
• Project: [Project name/description]
• Your expertise needed: [Specific skills/knowledge]
• Timeline: [Expected duration]
• Benefits: [What both parties gain]

I admire your work in [relevant area] and believe your insights would be invaluable to this initiative.

Would you be interested in discussing this further? I'm happy to provide more details and answer any questions.

Best regards,
IMRAN HOSSEN`
        }
    };

    // Handle template selection
    emailTemplates.addEventListener('change', function() {
        const selectedTemplate = this.value;
        if (selectedTemplate && templates[selectedTemplate]) {
            const template = templates[selectedTemplate];
            subjectInput.value = template.subject;
            messageTextarea.value = template.message;
            
            // Show live preview with signature
            showEmailPreview(template.message);
            
            // Add a small animation to indicate the template was loaded
            messageTextarea.style.backgroundColor = '#e8f5e8';
            setTimeout(() => {
                messageTextarea.style.backgroundColor = '';
            }, 1000);
        } else {
            // Hide preview if no template selected
            document.getElementById('previewSection').style.display = 'none';
        }
    });

    // Function to show email preview with signature
    function showEmailPreview(message) {
        const previewSection = document.getElementById('previewSection');
        const emailPreview = document.getElementById('emailPreview');
        
        const htmlSignature = `
        <div class="preview-signature-container">
            <div class="preview-signature-details">
                <h2>IMRAN HOSSEN</h2>
                <p>Computer Engineer</p>
                <p>Founder and CEO | DARKBDSHOP</p>
            </div>
            <div class="preview-signature-contact">
                <p><i class="fas fa-phone"></i> +8809638840088</p>
                <p><i class="fas fa-envelope"></i> contact@imranhossen.me</p>
                <p><i class="fas fa-globe"></i> <a href="https://www.imranhossen.me" target="_blank" class="preview-url">https://www.imranhossen.me</a></p>
                <p><i class="fas fa-map-marker-alt"></i> Angargara, Bhaluka, Mymenshingh, 2240</p>
            </div>
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <div class="preview-social-icons">
            <a href="https://www.facebook.com/imranhossenme"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com/imranhossenme"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/imranhossenme"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/imranhossenme"><i class="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/@imranhossenme"><i class="fab fa-youtube"></i></a>
        </div>
        <p class="preview-copyright">Copyright © 2025 IMRAN HOSSEN</p>`;

        const htmlMessage = message.replace(/\n/g, '<br>') + htmlSignature;
        emailPreview.innerHTML = htmlMessage;
        previewSection.style.display = 'block';
    }

    // Update preview when message is manually edited
    messageTextarea.addEventListener('input', function() {
        if (this.value.trim() && document.getElementById('previewSection').style.display === 'block') {
            showEmailPreview(this.value);
        }
    });

    // Show status message
    function showStatus(message, isSuccess = true) {
        // Remove existing status messages
        const existingStatus = document.querySelector('.status-message');
        if (existingStatus) {
            existingStatus.remove();
        }

        // Create new status message
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-message ${isSuccess ? 'success' : 'error'}`;
        statusDiv.textContent = message;
        
        // Insert at the top of the form
        emailForm.insertBefore(statusDiv, emailForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 5000);
    }

    // Handle form submission
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '📤 Sending...';
        
        try {
            // Get form data
            const formData = new FormData(emailForm);
            const emailData = {
                to: formData.get('to_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                from: formData.get('from_email'),
                from_name: formData.get('from_name'),
                cc: formData.get('cc_email'),
                bcc: formData.get('bcc_email')
            };

            // Send email via API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if (result.success) {
                showStatus('✅ Email sent successfully!', true);
                // Clear form fields except signature
                document.getElementById('recipient').value = '';
                document.getElementById('subject').value = '';
                document.getElementById('message').value = '';
                document.getElementById('cc_email').value = '';
                document.getElementById('bcc_email').value = '';
            } else {
                showStatus(`❌ Failed to send email: ${result.error}`, false);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showStatus('❌ Network error. Please check your connection and try again.', false);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Optional: Add advanced options toggle
    function toggleAdvancedOptions() {
        const advancedOptions = document.getElementById('advancedOptions');
        if (advancedOptions.style.display === 'none') {
            advancedOptions.style.display = 'block';
        } else {
            advancedOptions.style.display = 'none';
        }
    }

    // Add advanced options toggle button (optional)
    const advancedToggle = document.createElement('button');
    advancedToggle.type = 'button';
    advancedToggle.textContent = '⚙️ Advanced Options';
    advancedToggle.style.marginBottom = '10px';
    advancedToggle.style.padding = '5px 10px';
    advancedToggle.style.border = '1px solid #ccc';
    advancedToggle.style.borderRadius = '3px';
    advancedToggle.style.backgroundColor = '#f8f9fa';
    advancedToggle.style.cursor = 'pointer';
    
    advancedToggle.addEventListener('click', toggleAdvancedOptions);
    
    // Insert toggle button before advanced options
    const advancedOptions = document.getElementById('advancedOptions');
    advancedOptions.parentNode.insertBefore(advancedToggle, advancedOptions);
});