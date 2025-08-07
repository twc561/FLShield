from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 390, 'height': 844})
    page = context.new_page()
    page.goto("http://localhost:3000/dashboard", timeout=60000)
    page.wait_for_selector("h1:has-text('Dashboard')")
    page.screenshot(path="jules-scratch/verification/mobile_nav.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
