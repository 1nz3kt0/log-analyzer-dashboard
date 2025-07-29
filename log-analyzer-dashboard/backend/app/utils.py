from datetime import datetime
import re

def parse_log_file(path):
    # Parsing simple: syslog format
    entries = []
    with open(path, "r") as f:
        for line in f:
            # Ejemplo: "Jun 10 12:34:56 hostname appname[123]: message"
            m = re.match(r"^(\w+ +\d+ +\d+:\d+:\d+) .* (ERROR|WARNING|INFO)?[: ](.*)", line)
            if m:
                date_str, severity, message = m.groups()
                # Parse date (no año, se puede ajustar)
                try:
                    date = datetime.strptime(date_str, "%b %d %H:%M:%S")
                    date = date.replace(year=datetime.now().year)
                    date_out = date.strftime("%Y-%m-%d %H:%M:%S")
                except:
                    date_out = ""
                entries.append({
                    "date": date_out,
                    "severity": severity if severity else "INFO",
                    "message": message,
                    "source_ip": None
                })
    return entries